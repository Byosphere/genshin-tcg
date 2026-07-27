import fs from "fs";
import path from "path";
import cards from "./cards_set_1.json" with { type: "json" };

const dir = path.join(process.cwd(), "public", "_set1");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

if (!fs.existsSync(dir)) {
  console.error(`Folder not found: ${dir}`);
  process.exit(1);
}

const usedNames = new Set();
let renamedCount = 0;

for (const card of cards) {
  const originalName = card.filename;
  if (!originalName) continue;

  const sourcePath = path.join(dir, originalName);
  if (!fs.existsSync(sourcePath)) continue;

  const extension = path.extname(originalName).toLowerCase();
  if (!imageExtensions.has(extension)) continue;

  const safeId = String(card.cardId ?? "")
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "_");

  const baseName = safeId || path.basename(originalName, extension);
  let targetName = `${baseName}${extension}`;
  let counter = 2;

  while (usedNames.has(targetName)) {
    targetName = `${baseName}_${counter}${extension}`;
    counter += 1;
  }

  usedNames.add(targetName);

  if (targetName !== originalName) {
    const targetPath = path.join(dir, targetName);
    fs.renameSync(sourcePath, targetPath);
    card.filename = targetName;
    renamedCount += 1;
  }
}

fs.writeFileSync(
  path.join(process.cwd(), "src/assets/cards_set_1.json"),
  JSON.stringify(cards, null, 2) + "\n",
);

console.log(`Renamed ${renamedCount} image files in public/_set1.`);
