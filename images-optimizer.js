const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const rimraf = require('rimraf');

const folders = [
  path.join(__dirname, '/src/pages/blog'),
  path.join(__dirname, '/src/pages/visiter-amsterdam'),
  path.join(__dirname, '/src/pages/vivre-aux-pays-bas'),
];

const outputFolder = path.join(__dirname, 'static/images/');

(async function imageOptimizer() {
  try {
    if (process.argv.includes('clean')) {
      await new Promise(resolve => rimraf(outputFolder, resolve));
    }
    await fs.mkdir(outputFolder, {recursive: true}).catch();

    for (let i = 0, n = folders.length; i < n; i++) {
      const folder = folders[i];
      const response = await fs.readdir(folder, {withFileTypes: true});
      const items = response.filter(dirent => dirent.isDirectory());
      const articles = items.map(dirent => dirent.name);

      for (let i = 0, n = articles.length; i < n; i++) {
        let article = path.join(folder, articles[i]);
        const slug = articles[i].match(/__(.+?)$/)[1];
        const saveFolder = path.join(outputFolder + slug);
        console.log(saveFolder);
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
              await toJPEG(original, name, 20, saveFolder);
              await toJPEG(original, name, 400, saveFolder);
              await toJPEG(original, name, 800, saveFolder);
              await toJPEG(original, name, 1600, saveFolder);

              await toWEBP(original, name, 20, saveFolder);
              await toWEBP(original, name, 400, saveFolder);
              await toWEBP(original, name, 800, saveFolder);
              await toWEBP(original, name, 1600, saveFolder);
              await toWEBP(original, name, 3200, saveFolder);
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

async function toJPEG(original, name, size, saveFolder) {
  const outputFile = name + `-${size}w.jpeg`;
  const skip = await isOptimized(saveFolder, outputFile);
  if (!skip) {
    await fs.mkdir(saveFolder, {recursive: true}).catch();
    return await sharp(original)
      .resize({width: size})
      .jpeg({
        quality: 70,
        progressive: true,
        chromaSubsampling: '4:4:4',
      })
      .toFile(path.join(saveFolder, outputFile))
      .catch(err => console.log(err));
  }
  return null;
}

async function toWEBP(original, name, size, saveFolder) {
  const outputFile = name + `-${size}w.webp`;
  const skip = await isOptimized(saveFolder, outputFile);
  if (!skip) {
    return await sharp(original)
      .resize({width: size})
      .webp({
        quality: 80,
      })
      .toFile(path.join(saveFolder, name + `-${size}w.webp`))
      .catch(err => console.log(err));
  }
  return null;
}

async function isOptimized(saveFolder, outputFile) {
  return fs
    .stat(path.join(saveFolder, outputFile))
    .then(() => true, () => false)
    .catch(err => console.log(err));
}
