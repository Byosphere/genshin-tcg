import fs from "fs";
import path from "path";
import pngToJpeg from "png-to-jpeg";
// import cards from "./cards_set_4.json" with { type: "json" };

// Set the folder path you want to clean
const folderPath = path.join(process.cwd(), "public", "set4_wip");

fs.readdir(folderPath, (err, files) => {
  files.forEach((f) => {
    const originalFile = path.join(folderPath, f);
    if (f.split(".")[1] === "png") {
      const newFileName = f.split(".")[0] + ".jpg";
      const newFile = path.join(folderPath, newFileName);
      console.log(f, newFileName);
      let buffer = fs.readFileSync(originalFile);
      pngToJpeg({ quality: 90 })(buffer).then((output) => {
        fs.writeFileSync(newFile, output);
        fs.unlink(originalFile, () => {
          if (err) {
            console.error(`Failed to delete ${f}:`, err);
          } else {
            console.log(`Deleted: ${f}`);
          }
        });
      });
    }
  });
});

// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error("Error reading folder:", err);
//     return;
//   }

//   const filesToDelete = files.filter((file) => file.includes("(1)"));

//   if (filesToDelete.length === 0) {
//     console.log('No files containing "(1)" were found.');
//     return;
//   }

//   console.log(`Found ${filesToDelete.length} file(s) to delete:`);
//   filesToDelete.forEach((file) => console.log(` - ${file}`));

//   filesToDelete.forEach((file) => {
//     const filePath = path.join(folderPath, file);
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error(`Failed to delete ${file}:`, err);
//       } else {
//         console.log(`Deleted: ${file}`);
//       }
//     });
//   });
// });

// fs.readdir(folderPath, (err, files) => {
//   files.forEach((file) => {
//     const originalFile = path.join(folderPath, file);
//     const ext = "." + file.split(".")[1];
//     const targetName = file.split(" ")[0] + "_4" + ext;
//     const targetPath = path.join(folderPath, targetName);
//     console.log(file, targetName);
//     fs.renameSync(originalFile, targetPath);
//   });
// });
