# Image Generation Pipeline Guide

**For AI Agents and Developers**

This document describes the image generation architecture used in the Warhammer Fantasy FTG Edition project. Use this as a reference to replicate the system in other projects.

---

## Overview

This project generates campaign handouts and NPC portraits using:
- **OpenAI Images API** (model: `gpt-image-1`, formerly DALL·E 3)
- **HTML prompt catalogs** parsed with Cheerio
- **Node.js ESM scripts** with environment-based configuration
- **Base64 decoding** to save PNG files locally

Key features:
- **Reproducible**: All prompts stored in version-controlled HTML files.
- **Idempotent**: Re-running skips existing images.
- **Polite**: Built-in rate-limiting delays (1200ms between calls).
- **Configurable**: Model, size, and quality tunable via `.env`.

---

## Architecture

```
Project Root
├── .env                          # OPENAI_API_KEY and optional config
├── .env.example                  # Template
├── package.json                  # ESM; scripts: handouts:images, handouts:npcs
├── node_modules/
└── campaigns/
    └── <campaign-name>/
        └── handouts/
            ├── handouts_prompts.html        # Handout prompts
            ├── generate_handout_images.mjs  # Generator script
            ├── images/                       # Output: handout PNGs
            │   ├── s01_*.png
            │   └── ...
            └── npcs/
                ├── persons.html              # NPC prompts
                ├── generate_npc_images.mjs   # Generator script
                └── npc_*.png                 # Output: portrait PNGs
```

---

## Dependencies

Install once from project root:

```powershell
npm install
```

**package.json** (minimal):

```json
{
  "name": "your-project",
  "type": "module",
  "dependencies": {
    "cheerio": "^1.0.0-rc.12",
    "dotenv": "^16.4.5",
    "openai": "^4.55.0"
  },
  "scripts": {
    "handouts:images": "node campaigns/<campaign>/handouts/generate_handout_images.mjs",
    "handouts:npcs": "node campaigns/<campaign>/handouts/npcs/generate_npc_images.mjs"
  }
}
```

---

## HTML Prompt Format

### Structure

Both `handouts_prompts.html` and `persons.html` use this pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prompt Catalog</title>
</head>
<body>
  <div class="item">
    <h2>Title or Description (filename.png)</h2>
    <p class="meta">Use: Session 01</p>
    <pre class="code">Detailed DALL·E prompt text goes here.
Describe composition, mood, style, and key elements.
Be specific about the Old World grimdark aesthetic.</pre>
    <img src="./images/filename.png" width="200" alt="Preview" />
  </div>

  <div class="item">
    <h2>Another Item (another_file.png)</h2>
    <p class="meta">Use: Session 02</p>
    <pre class="code">Another prompt...</pre>
    <img src="./images/another_file.png" width="200" alt="Preview" />
  </div>
</body>
</html>
```

### Key Elements

- `<div class="item">`: Container for each prompt
- `<h2>`: Title with filename in parentheses; script extracts the filename
- `<p class="meta">`: Optional usage note (session, context)
- `<pre class="code">`: The actual prompt text
- `<img>`: Optional preview thumbnail (200px width for inline display)

**Filename extraction**:
- If `<h2>` contains `(filename.png)`, use that
- Otherwise, slugify the title (lowercase, replace spaces with `_`)
- Script auto-appends `.png` if missing

---

## Generator Script Pattern

### Core Logic

1. **Environment loading**
   - Load `.env` from project root with `dotenv.config()`
   - Validate `OPENAI_API_KEY` is set

2. **Parse HTML**
   - Use Cheerio to load the HTML file
   - Select all `.item` elements
   - Extract `h2` (filename), `.meta` (usage), `.code` (prompt)

3. **Generate images sequentially**
   - For each prompt:
     - Check if output file exists (skip if present)
     - Append art direction suffix to prompt
     - Call `openai.images.generate()` with:
       - `model`: `gpt-image-1` (or env override)
       - `prompt`: full text
       - `size`: `1024x1536` (portrait; configurable)
       - `quality`: `high`
       - `n`: `1`
     - Decode base64 response and write PNG
     - Sleep 1200ms (polite rate limiting)

4. **Error handling**
   - Catch per-image errors, log, continue
   - Exit with error if `OPENAI_API_KEY` missing

### Minimal Script Template

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { load } from 'cheerio';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../../..');
const HTML_FILE = path.resolve(__dirname, 'prompts.html');
const OUT_DIR = path.resolve(__dirname, 'output');

dotenv.config({ path: path.join(ROOT, '.env') });

const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const SIZE = process.env.OPENAI_IMAGE_SIZE || '1024x1536';
const QUALITY = process.env.OPENAI_IMAGE_QUALITY || 'high';

function ensurePng(name) {
  const clean = name.replace(/[()]/g, '').trim();
  return clean.toLowerCase().endsWith('.png') ? clean : `${clean}.png`;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not set');
  }

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

  console.log(`Found ${items.length} prompts`);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  for (let i = 0; i < items.length; i++) {
    const { filename, prompt } = items[i];
    const outPath = path.join(OUT_DIR, filename);
    if (await exists(outPath)) {
      console.log(`[skip] ${filename}`);
      continue;
    }

    const fullPrompt = `${prompt}\n\nArt direction: Your style notes here.`;
    console.log(`[${i + 1}/${items.length}] ${filename}`);

    try {
      const res = await openai.images.generate({
        model: MODEL,
        prompt: fullPrompt,
        size: SIZE,
        quality: QUALITY,
        n: 1
      });
      const data = res.data?.[0]?.b64_json;
      if (!data) throw new Error('No image data');
      await fs.writeFile(outPath, Buffer.from(data, 'base64'));
      console.log(`  saved`);
    } catch (err) {
      console.error(`  failed:`, err?.message || err);
    }

    await sleep(1200);
  }
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

main().catch(err => { console.error(err); process.exit(1); });
```

---

## Environment Configuration

### .env (project root)

```env
OPENAI_API_KEY=sk-proj-...

# Optional overrides
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1024x1536
OPENAI_IMAGE_QUALITY=high
OPENAI_IMAGE_N=1
```

### .env.example (committed template)

```env
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Override image generation settings
# OPENAI_IMAGE_MODEL=gpt-image-1
# OPENAI_IMAGE_SIZE=1024x1536
# OPENAI_IMAGE_QUALITY=high
# OPENAI_IMAGE_N=1
```

---

## Usage

### Step 1: Create .env

```powershell
Copy-Item -Path .env.example -Destination .env
# Edit .env and set OPENAI_API_KEY
```

### Step 2: Install dependencies

```powershell
npm install
```

### Step 3: Run generators

```powershell
# Handouts
npm run handouts:images

# NPC portraits
npm run handouts:npcs
```

### Step 4: Verify output

Images appear in the designated output folders:
- Handouts: `campaigns/<campaign>/handouts/images/*.png`
- NPCs: `campaigns/<campaign>/handouts/npcs/npc_*.png`

---

## Art Direction Pattern

Both scripts append a consistent art direction suffix to each prompt:

```
Art direction: Old World grimdark, aged parchment, hand-inked illustration, Gothic calligraphy headers, minimal muted spot colors.
```

**Customize for your project:**
- Replace "Old World grimdark" with your setting's aesthetic
- Add medium notes (watercolor, pencil sketch, digital painting, etc.)
- Specify color palette, mood, or framing

---

## Cost and Rate Limiting

### Costs

- **OpenAI Images API** charges per generation (varies by model/quality).
- Example: `gpt-image-1` with `quality=high` and `size=1024x1536` costs ~$0.08–0.12 per image (as of late 2024; check current pricing).
- Generating 30–50 images = $3–6 USD.

### Rate Limits

- Scripts include 1200ms delays between calls.
- OpenAI may impose per-minute or per-day limits depending on your account tier.
- On rate limit errors (429), wait and re-run; existing files are skipped.

---

## Embedding Images in Markdown

After generation, embed images with relative paths:

```markdown
## Session 01 Handouts

- Apothecary Invoice
  
  <img src="./handouts/images/s01_apothecary_invoice.png" width="200" alt="Invoice" />

- Candle Tag
  
  <img src="./handouts/images/s01_candle_tag.png" width="200" alt="Candle Tag" />
```

Or use standard Markdown syntax:

```markdown
![Apothecary Invoice](./handouts/images/s01_apothecary_invoice.png)
```

---

## Troubleshooting

### OPENAI_API_KEY not set

- Ensure `.env` exists at project root.
- Confirm it contains `OPENAI_API_KEY=sk-...`.
- Restart terminal after creating `.env`.

### ESM import errors

- Verify `"type": "module"` in `package.json`.
- Use Node 18+ LTS.

### Rate limit (429) errors

- Wait 60 seconds, then re-run.
- Script skips existing files, so you won't lose progress.

### Output folder not found

- Scripts create folders automatically with `fs.mkdir({ recursive: true })`.
- Check file paths in script constants (`OUT_DIR`).

### Image quality issues

- Increase `OPENAI_IMAGE_SIZE` (e.g., `1792x1024` landscape, `1024x1792` tall portrait).
- Use `quality=high` (default in scripts).
- Refine prompts: add composition, lighting, and detail keywords.

---

## Replicating in Another Project

### Quick Start Checklist

1. **Set up Node.js project**
   - `npm init -y`
   - Set `"type": "module"` in `package.json`
   - Install: `npm install cheerio dotenv openai`

2. **Create .env and .env.example**
   - Add `OPENAI_API_KEY=...` to `.env`
   - Commit `.env.example` as a template

3. **Create HTML prompt catalog**
   - Use the format above with `.item`, `h2`, `.meta`, `.code`
   - Example: `prompts.html` in your content folder

4. **Write generator script**
   - Copy the minimal template above
   - Adjust `ROOT`, `HTML_FILE`, `OUT_DIR` constants
   - Customize art direction suffix

5. **Add npm script**
   - `"generate:images": "node path/to/generator.mjs"`

6. **Run and verify**
   - `npm run generate:images`
   - Check output folder for PNGs

### Adapt for Other AI Image Services

Replace the OpenAI call with your provider's API:

- **Stability AI (Stable Diffusion)**: Use their Node SDK; decode base64 or download URL.
- **Midjourney**: No official API; consider Discord bot automation (complex).
- **Replicate**: Supports various models; similar async/await pattern.

Core pattern remains:
1. Parse HTML prompts
2. Loop through items
3. Call API with prompt + config
4. Decode and save image
5. Add polite delays

---

## Summary

This system provides:
- **Version-controlled prompts** (HTML catalogs)
- **Automated batch generation** (Node.js scripts)
- **Reproducible workflows** (npm scripts + .env config)
- **Inline previews** (200px thumbnails in HTML and markdown)

Use this guide to replicate the pipeline in any campaign or content project requiring AI-generated visuals.

---

**Original project**: [Warhammer Fantasy FTG Edition](https://github.com/oveku/Warhammer-Fantasy-FTG-Edition)

*Last updated: December 2025*
