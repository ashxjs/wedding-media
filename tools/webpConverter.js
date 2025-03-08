const fs = require("fs");
const sharp = require("sharp");

const images = fs.readdirSync("./public/images");

await Promise.all(
  images.map(async (image, i) => {
    const outputPath = `./public/images/${image.replace(".jpg", ".webp")}`;
    console.info(`Converting ${image} (${i + 1}/${images.length})`);

    return sharp(`./public/images/${image}`)
      .webp({ quality: 80 })
      .toFile(outputPath);
  })
);
