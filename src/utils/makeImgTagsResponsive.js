import path from 'path';
import createElementFromHTML from './createElementFromHTML';

export default (el, slug, siteUrl) => {
  const image = createElementFromHTML(el);
  const src = image.src;
  const fileExtension = path.extname(src);
  const needOptimization = ['.jpg', '.jpeg', '.png'].includes(fileExtension.toLowerCase());

  if (needOptimization) {
    const alt = image.alt || '';
    const title = image.title || '';
    const fileName = path.basename(src, fileExtension);

    const basePath = `${siteUrl}/images/${slug}/${fileName}`;

    const webp = document.createElement('source');
    webp.type = 'image/webp';
    setSrcSet(webp);
    setSizes(webp);

    const jpeg = document.createElement('source');
    jpeg.type = 'image/jpeg';
    setSrcSet(jpeg);
    setSizes(jpeg);

    const img = document.createElement('img');
    img.src = `${basePath}-20w.jpeg`;
    if (alt) img.alt = alt;
    if (title) img.title = title;
    img.classList.add('post__image', 'lazyload');

    const picture = document.createElement('picture');
    [webp, jpeg, img].forEach(el => picture.appendChild(el));

    const div = document.createElement('div');
    div.classList.add('post__image-container');
    div.appendChild(picture);

    return div.outerHTML;

    function setSrcSet(el) {
      const ext = el.type === 'image/webp' ? 'webp' : 'jpeg';
      return el.setAttribute(
        'data-srcset',
        `${basePath}-400w.${ext} 400w, ${basePath}-800w.${ext} 800w, ${basePath}-1600w.${ext} 1600w`
      );
    }

    function setSizes(el) {
      return el.setAttribute('sizes', '(max-width: 770px) 100vw, 770px');
    }
  }
  return el;
};
