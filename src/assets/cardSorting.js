// import cards from "./cards_1.json" with { type: "json" };
import cards from "./tcgCards.json" with { type: "json" };
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "_set1");
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
  .sort((a, b) => {
    const numA = Number.parseInt(a.split("_").pop(), 10);
    const numB = Number.parseInt(b.split("_").pop(), 10);
    return numA - numB;
  });

const entries = [];
entries.push(...cards);
entries.forEach((entry, index) => {
  entry.type = getCardNum(entry.cardId).letter;
  entry.set = 1;
  entry.filename = files[index] || "unknown";
});

entries.sort((a, b) => {
  const aInfo = getCardNum(a.cardId);
  const bInfo = getCardNum(b.cardId);

  if (aInfo.letter !== bInfo.letter) {
    const letterOrder = { C: 0, A: 1, T: 2 };
    return (
      (letterOrder[aInfo.letter] ?? 99) - (letterOrder[bInfo.letter] ?? 99)
    );
  }

  if (aInfo.num !== bInfo.num) {
    return aInfo.num - bInfo.num;
  }

  return a.rarity - b.rarity;
});

entries.forEach((entry, index) => {
  entry.filename = files[index] || "unknown";
});

fs.writeFileSync(
  path.join(process.cwd(), "src/assets/tcgCards.json"),
  JSON.stringify(entries, null, 2) + "\n",
);

function getCardNum(cardId) {
  const parts = cardId.split("-");
  const id = parts.pop();
  const letter = id[0];
  const num = Number.parseInt(id.slice(1), 10);
  return { letter, num };
}
