import fs from "fs";
import path from "path";
import cards from "./cards_set_3.json" with { type: "json" };

const dir = path.join(process.cwd(), "public", "_set3");

if (!fs.existsSync(dir)) {
  console.error(`Folder not found: ${dir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
  .sort((a, b) => {
    const numA = Number.parseInt(a.split("_").pop(), 10);
    const numB = Number.parseInt(b.split("_").pop(), 10);
    return numA - numB;
  });

const test = [];
files.forEach((f, i) => {
  if (!cards[i]) return;
  const rarity = cards[i].rarity > 1 ? "_" + cards[i].rarity : "";
  let name = cards[i].cardId + rarity + ".jpg";
  fs.renameSync(path.join(dir, f), path.join(dir, name));
});
