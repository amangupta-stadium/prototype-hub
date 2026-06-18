#!/usr/bin/env node
/*
 * build-tokens.js
 * Reads every *.json file in tokens/ and emits CSS custom properties
 * into dist/tokens.css. Zero dependencies — runs on plain Node.
 *
 * Token name -> CSS var mapping:
 *   color.brand.punch          -> --color-punch
 *   color.neutral.500          -> --color-neutral-500
 *   font.family.display        -> --font-display
 *   font.size.base             -> --text-base
 *   space.4                    -> --space-4
 *   radius.md                  -> --radius-md
 *   shadow.md                  -> --shadow-md
 *
 * The remapping rules below keep the CSS var names short and readable,
 * matching the names referenced in CLAUDE.md.
 */

const fs = require("fs");
const path = require("path");

const TOKENS_DIR = path.join(__dirname, "tokens");
const OUT_FILE = path.join(__dirname, "dist", "tokens.css");

// Custom short names so the CSS vars read nicely.
const RENAME = {
  "color.brand":     (k) => `--color-${k}`,
  "color.on-brand":  (k) => `--color-${k}`,
  "color.neutral":   (k) => `--color-neutral-${k}`,
  "color.semantic":  (k) => `--color-${k}`,
  "font.family":     (k) => `--font-${k}`,
  "font.weight":     (k) => `--weight-${k}`,
  "font.size":       (k) => `--text-${k}`,
  "font.line-height":(k) => `--leading-${k}`,
  "space":           (k) => `--space-${k}`,
  "radius":          (k) => `--radius-${k}`,
  "shadow":          (k) => `--shadow-${k}`,
};

function flatten(obj, prefix = []) {
  const out = [];
  for (const [key, val] of Object.entries(obj)) {
    if (val && typeof val === "object" && "value" in val) {
      out.push({ pathParts: [...prefix, key], value: val.value });
    } else if (val && typeof val === "object") {
      out.push(...flatten(val, [...prefix, key]));
    }
  }
  return out;
}

function cssVarName(pathParts) {
  for (const [prefix, fn] of Object.entries(RENAME)) {
    const pp = prefix.split(".");
    if (pp.every((seg, i) => pathParts[i] === seg)) {
      const leaf = pathParts.slice(pp.length).join("-");
      return fn(leaf);
    }
  }
  return "--" + pathParts.join("-");
}

const all = [];
for (const file of fs.readdirSync(TOKENS_DIR)) {
  if (!file.endsWith(".json")) continue;
  const json = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, file), "utf8"));
  all.push(...flatten(json));
}

const lines = all
  .map(({ pathParts, value }) => `  ${cssVarName(pathParts)}: ${value};`)
  .sort();

const css = `:root {\n${lines.join("\n")}\n}\n`;
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, css);
console.log(`Wrote ${all.length} tokens to ${path.relative(__dirname, OUT_FILE)}`);
