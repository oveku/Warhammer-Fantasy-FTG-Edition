// Node.js script to generate images from DALL·E/GPT-Image using prompts in handouts_prompts.html
// Usage:
//   1) Set environment variable OPENAI_API_KEY
//   2) npm install
//   3) node campaigns/shadows-of-the-southwest/handouts/generate_handout_images.mjs
// Output:
//   PNG files saved to campaigns/shadows-of-the-southwest/handouts/images/

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '../../..');
const HTML_FILE = path.resolve(__dirname, 'handouts_prompts.html');
const OUT_DIR = path.resolve(__dirname, 'images');

const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const SIZE = process.env.OPENAI_IMAGE_SIZE || '1024x1536'; // portrait-friendly
const QUALITY = process.env.OPENAI_IMAGE_QUALITY || 'high';
const N_IMAGES = parseInt(process.env.OPENAI_IMAGE_N || '1', 10);

function ensurePng(filenameFallback) {
  // filename string may carry .png in parentheses inside h2
  const clean = filenameFallback.replace(/[()]/g, '').trim();
  return clean.toLowerCase().endsWith('.png') ? clean : `${clean}.png`;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set. Create a .env or set the environment variable before running.');
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const html = await fs.readFile(HTML_FILE, 'utf8');
  const $ = load(html);

  const items = [];
  $('.item').each((_, el) => {
    const $el = $(el);
    const title = $el.find('h2').first().text().trim();
    const m = title.match(/\(([^)]+)\)\s*$/); // capture filename in parentheses
    const filenameCandidate = m ? m[1] : title.replace(/\s+/g, '_').toLowerCase();
    const filename = ensurePng(filenameCandidate);
    const use = $el.find('.meta').first().text().replace(/^Use:\s*/i, '').trim();
    const prompt = $el.find('.code').first().text().trim();
    if (prompt) {
      items.push({ title, filename, use, prompt });
    }
  });

  if (items.length === 0) {
    throw new Error('No prompts found in handouts_prompts.html');
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log(`Found ${items.length} handout prompts. Generating images with model=${MODEL}, size=${SIZE} ...`);

  // Simple sequential generation to avoid rate limits. Adjust if needed.
  for (let i = 0; i < items.length; i++) {
    const { filename, prompt, title } = items[i];
    const outPath = path.join(OUT_DIR, filename);
    if (await fileExists(outPath)) {
      console.log(`[skip] ${filename} already exists`);
      continue;
    }

    const fullPrompt = `${prompt}\n\nArt direction: Old World grimdark, aged parchment, hand-inked illustration, Gothic calligraphy headers, minimal muted spot colors.`; 

    console.log(`[${i + 1}/${items.length}] Generating: ${filename}`);

    try {
      const res = await openai.images.generate({
        model: MODEL,
        prompt: fullPrompt,
        size: SIZE,
        n: N_IMAGES,
        quality: QUALITY
      });

      const data = res.data?.[0]?.b64_json;
      if (!data) throw new Error('No image data returned');

      const buf = Buffer.from(data, 'base64');
      await fs.writeFile(outPath, buf);
      console.log(` → saved ${path.relative(ROOT, outPath)}`);
    } catch (err) {
      console.error(` × failed ${filename}:`, err?.message || err);
      // small delay before continuing
      await sleep(1500);
    }

    // polite pacing
    await sleep(1200);
  }

  console.log('Done. Images in:', path.relative(ROOT, OUT_DIR));
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

main().catch(err => { console.error(err); process.exit(1); });
