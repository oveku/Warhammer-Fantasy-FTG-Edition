// Generate NPC images from persons.html using OpenAI Images API
// Usage:
//   1) Set OPENAI_API_KEY in .env (project root)
//   2) npm run handouts:npcs
// Output saved to ../images/

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import dotenv from 'dotenv';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../../..');
const HTML_FILE = path.resolve(__dirname, 'persons.html');
const OUT_DIR = path.resolve(__dirname, '../images');

dotenv.config({ path: path.join(ROOT, '.env') });

const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const SIZE = process.env.OPENAI_IMAGE_SIZE || '1024x1536';
const QUALITY = process.env.OPENAI_IMAGE_QUALITY || 'high';
const N_IMAGES = parseInt(process.env.OPENAI_IMAGE_N || '1', 10);

function ensurePng(filenameFallback) {
  const clean = filenameFallback.replace(/[()]/g, '').trim();
  return clean.toLowerCase().endsWith('.png') ? clean : `${clean}.png`;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');

  await fs.mkdir(OUT_DIR, { recursive: true });
  const html = await fs.readFile(HTML_FILE, 'utf8');
  const $ = load(html);

  const items = [];
  $('.item').each((_, el) => {
    const title = $(el).find('h2').first().text().trim();
    const m = title.match(/\(([^)]+)\)\s*$/);
    const filename = ensurePng(m ? m[1] : title.replace(/\s+/g, '_').toLowerCase());
    const prompt = $(el).find('.code').first().text().trim();
    if (prompt) items.push({ title, filename, prompt });
  });

  console.log(`NPC prompts found: ${items.length}`);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  for (let i = 0; i < items.length; i++) {
    const { filename, prompt, title } = items[i];
    const outPath = path.join(OUT_DIR, filename);
    if (await exists(outPath)) { console.log(`[skip] ${filename}`); continue; }

    const fullPrompt = `${prompt}\n\nArt direction: Old World grimdark, aged parchment, hand‑inked illustration, Gothic caption space, minimal muted spot colors.`;
    console.log(`[${i + 1}/${items.length}] ${title} → ${filename}`);
    try {
      const res = await openai.images.generate({ model: MODEL, prompt: fullPrompt, size: SIZE, n: N_IMAGES, quality: QUALITY });
      const data = res.data?.[0]?.b64_json; if (!data) throw new Error('No image data');
      await fs.writeFile(outPath, Buffer.from(data, 'base64'));
      console.log(`  saved ${path.relative(ROOT, outPath)}`);
    } catch (e) {
      console.error(`  failed ${filename}:`, e?.message || e);
    }
    await sleep(1200);
  }
}

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

main().catch(e => { console.error(e); process.exit(1); });
