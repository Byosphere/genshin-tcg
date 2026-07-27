import fs from "fs";
import path from "path";
import cards from "./cards_set_4.json" with { type: "json" };

const data = cards.map((c) => {
  return {
    cardType: c.Category.split(" ")[0].trim(),
    cardId:
      c.Set +
      "-" +
      c.Category.split(" ")[1].trim().replaceAll("(", "").replaceAll(")", "") +
      c.Number,
    rarity: 0,
    name: c.Name,
    type: c.Category.split(" ")[1]
      .trim()
      .replaceAll("(", "")
      .replaceAll(")", ""),
    set: 4,
  };
});

fs.writeFileSync(
  path.join(process.cwd(), "src/assets/cards_set_4.json"),
  JSON.stringify(data, null, 2) + "\n",
);
