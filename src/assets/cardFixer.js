import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "_set2");

if (!fs.existsSync(dir)) {
  console.error(`Folder not found: ${dir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
// .sort((a, b) => a - b);

let index = 138;
let count = 0;
const test = [];
files.forEach((f) => {
  let name = "";
  if (count === 2) {
    name = "GCG02B-A" + String(index).padStart(3, "0") + "_2.jpg";
    index++;
    count = 0;
  } else if (count) {
    name = "GCG02B-A" + String(index).padStart(3, "0") + ".jpg";
    count++;
  } else {
    name = "GCG02B-A" + String(index).padStart(3, "0") + "_3.jpg";
    count++;
  }
  // test.push(name);
  fs.renameSync(path.join(dir, f), path.join(dir, name));
});
