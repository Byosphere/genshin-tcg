import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public");
const entries = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(jpg|jpeg|png|webp|avif)$/i.test(entry.name)) {
      const rel = path.relative(root, full).split(path.sep);
      const folder = rel[0] || "";
      let set = "unknown";
      if (folder === "set1" || folder === "_set1") {
        set = "set1";
      } else if (folder === "_set2") {
        set = "set2";
      } else if (folder === "_set3") {
        set = "set3";
      }
      const ext = path.extname(entry.name);
      const baseName = entry.name.replace(/^cellImage_/, "").replace(ext, "");
      const cardId = baseName;
      entries.push({
        cardType: "unknown",
        cardId,
        rarity: "unknown",
        name: "Card " + cardId,
        filename: entry.name,
        set,
      });
    }
  }
}
walk(root);
entries.sort((a, b) => {
  const aNum = Number.parseInt(a.cardId.split("_").pop(), 10) || 0;
  const bNum = Number.parseInt(b.cardId.split("_").pop(), 10) || 0;
  if (a.set === b.set) {
    return aNum - bNum;
  }
  return a.set.localeCompare(b.set);
});
fs.writeFileSync(
  path.join(process.cwd(), "src/assets/tcgCards.json"),
  JSON.stringify(entries, null, 2) + "\n",
);
console.log("wrote " + entries.length + " entries to src/assets/tcgCards.json");
