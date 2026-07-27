// import cards from "./cards_1.json" with { type: "json" };
// import cards from "./tcgCards.json" with { type: "json" };
// import cards from "./cards_2.json" with { type: "json" };
import cards from "./cards_set_3.json" with { type: "json" };
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "_set3");
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
  .sort((a, b) => {
    const numA = Number.parseInt(a.split("_").pop(), 10);
    const numB = Number.parseInt(b.split("_").pop(), 10);
    return numA - numB;
  });

let entries = [];
entries.push(...cards);
entries.forEach((entry, index) => {
  const { letter, set } = getCardNum(entry.cardId);
  entry.type = letter;
  entry.set = set;
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

fs.writeFileSync(
  path.join(process.cwd(), "src/assets/cards_set_3.json"),
  JSON.stringify(entries, null, 2) + "\n",
);

function getCardNum(cardId) {
  const [el0, el1] = cardId.split("-");
  const letter = el1[0];
  const num = Number.parseInt(el1.slice(1), 10);
  const set = Number.parseInt(el0[4], 10);
  return { letter, num, set };
}
