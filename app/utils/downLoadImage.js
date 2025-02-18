"use server";

// utils/downloadImage.js

import fs from "fs";
import path from "path";
import https from "https";

export async function downloadImage(url, imageName) {
  const imagePath = path.join(process.cwd(), "public", "tokens", imageName);

  // Check if the image already exists
  if (fs.existsSync(imagePath)) {
    console.log(`Image ${imageName} already exists. Skipping download.`);
    return;
  }

  // Download the image
  const file = fs.createWriteStream(imagePath);
  https
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${imageName}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(imagePath, () => {});
      console.error(`Error downloading ${imageName}:`, err.message);
    });
}
