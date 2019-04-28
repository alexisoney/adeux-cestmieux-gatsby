const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const rimraf = require('rimraf');

const folders = [
  path.join(__dirname, '/src/pages/blog'),
  path.join(__dirname, '/src/pages/visiter-amsterdam'),
  path.join(__dirname, '/src/pages/vivre-aux-pays-bas'),
];

(async function imageOptimizer() {
  try {
    const outputFolder = path.join(__dirname, 'static/images/');
    await new Promise(resolve => rimraf(outputFolder, resolve));
    await fs.mkdir(outputFolder, {recursive: true}).catch();

    for (let i = 0, n = folders.length; i < n; i++) {
      const folder = folders[i];
      const response = await fs.readdir(folder, {withFileTypes: true});
      const items = response.filter(dirent => dirent.isDirectory());
      const articles = items.map(dirent => dirent.name);

      for (let i = 0, n = articles.length; i < n; i++) {
        let article = path.join(folder, articles[i]);
        let imagesFolder = path.join(article, 'images');
        try {
          // If there are images
          await fs.stat(imagesFolder);

          // Process each images
          const images = await fs.readdir(imagesFolder);
          for (let i = 0, n = images.length; i < n; i++) {
            const img = images[i];
            const canBeProcessed = ['.jpg', '.jpeg', '.png'].includes(
              path.extname(img).toLowerCase()
            );
            if (canBeProcessed) {
              const original = path.join(imagesFolder, img);
              const name = path.basename(img, path.extname(img));
              await toJPEG(original, name, 20, outputFolder);
              await toJPEG(original, name, 400, outputFolder);
              await toJPEG(original, name, 800, outputFolder);
              await toJPEG(original, name, 1600, outputFolder);

              await toWEBP(original, name, 20, outputFolder);
              await toWEBP(original, name, 400, outputFolder);
              await toWEBP(original, name, 800, outputFolder);
              await toWEBP(original, name, 1600, outputFolder);
              await toWEBP(original, name, 3200, outputFolder);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();

async function toJPEG(original, name, size, outputFolder) {
  const outputFile = name + `-${size}w.jpeg`;
  const skip = await isOptimized(outputFolder, outputFile);
  if (!skip) {
    return await sharp(original)
      .resize({width: size})
      .jpeg({
        quality: 70,
        progressive: true,
        chromaSubsampling: '4:4:4',
      })
      .toFile(path.join(outputFolder, outputFile))
      .catch(err => console.log(err));
  }
  return null;
}

async function toWEBP(original, name, size, outputFolder) {
  const outputFile = name + `-${size}w.webp`;
  const skip = await isOptimized(outputFolder, outputFile);
  if (!skip) {
    return await sharp(original)
      .resize({width: size})
      .webp({
        quality: 80,
      })
      .toFile(path.join(outputFolder, name + `-${size}w.webp`))
      .catch(err => console.log(err));
  }
  return null;
}

async function isOptimized(outputFolder, outputFile) {
  return fs
    .stat(path.join(outputFolder, outputFile))
    .then(() => true, () => false)
    .catch(err => console.log(err));
}
