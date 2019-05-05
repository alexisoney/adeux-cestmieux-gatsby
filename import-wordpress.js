const fetch = require('node-fetch');
const fsp = require('fs').promises;
const fs = require('fs');
const request = require('request');
const path = require('path');
const startingTime = new Date().getTime();
const downloadImage = require('image-downloader');

getPosts(100);

async function getPosts(perPage) {
  try {
    const response = await fetch(
      `https://adeux-cestmieux.com/wp-json/wp/v2/posts?per_page=${perPage}`
    );
    if (response.status === 200) {
      const posts = await response.json();
      for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        post = await addHeroMeta(post);
        post = addFrontMatter(post);
        post = addImagesLinks(post);
        post = addPath(post);
        post = addMarkdown(post);
        await saveContent(post);
        await saveImages(post);
      }

      // await createGlobal(posts, "md");
      // await createGlobal(posts, "html");

      const endingTime = (new Date().getTime() - startingTime) / 1000;
      console.log('Done in ' + endingTime + ' s');

      return posts;
    } else {
      throw new Error(response.status);
    }
  } catch (e) {
    console.error(e);
  }
}

async function addHeroMeta(post) {
  const heroURL = await getHeroUrl(post);
  const heroName = await heroURL.match(/[^/]+.\w+$/, '')[0];
  post.hero_url = heroURL;
  post.hero_name = heroName;

  return post;

  async function getHeroUrl(post) {
    try {
      const response = await fetch(
        `https://adeux-cestmieux.com/wp-json/wp/v2/media/${post.featured_media}/`
      );
      const json = await response.json();
      return json.source_url;
    } catch (e) {
      console.error(e);
    }
  }
}

function addFrontMatter(post) {
  let frontmatter = '';
  frontmatter += '---';
  frontmatter += `\ntitle: "${clean(post.title.rendered)}"`;
  frontmatter += `\nhero: "./images/${post.hero_name}"`;
  frontmatter += `\nexcerpt: "${clean(post.excerpt.rendered)}"`;
  frontmatter += '\n---';

  post.frontmatter = frontmatter;

  function clean(str) {
    let clean;
    clean = str
      .replace(/<.+?>/g, '')
      .replace(/[ ]\[&hellip;]/g, '')
      .replace(/\n*$/g, '');
    clean = typography(clean);
    return clean;
  }
  return post;
}

function addImagesLinks(post) {
  const content = post.content.rendered.replace(/<img src=["']\/.+?>/g, '');
  let images = content.match(/<img.+?src=['"](?<link>.+?)['"]/gi);
  if (images) {
    for (let i = 0, n = images.length; i < n; i++) {
      images[i] = images[i].replace(/<img.+?src=|'|"/gi, '').replace(/-\w{3,4}x\w{3,4}/i, '');
    }
  } else {
    images = [];
  }

  if (post.hero_url) {
    images.push(post.hero_url);
  }

  post.images = images;

  return post;
}

function addPath(post) {
  let category = 'blog';
  let timestamp = new Date(post.date);

  if (post.categories.includes(7)) {
    category = 'visiter-amsterdam';
    timestamp = new Date(post.modified);
  } else if (post.categories.includes(2)) {
    category = 'vivre-aux-pays-bas';
    timestamp = new Date(post.modified);
  }

  const day = ('0' + timestamp.getDate()).slice(-2);
  const month = ('0' + (timestamp.getMonth() + 1)).slice(-2);
  const year = timestamp.getFullYear();
  const date = `${year}-${month}-${day}`;

  post.path = path.join(category, '/', date + '__' + post.slug, '/');

  return post;
}

function addMarkdown(post) {
  const formatted = typography(post.content.rendered)
    .replace(/[ ]class=".*?"/g, '')
    .replace(/[ ]style=".*?"/g, '')
    .replace(/[ ]id=".*?"/g, '')
    // Heading
    .replace(/<h1>(.+?)<\/h1>/gi, (i, title) => '\n## ' + noTags(title))
    .replace(/<h2>(.+?)<\/h2>/gi, (i, title) => '\n## ' + noTags(title))
    .replace(/<h3>(.+?)<\/h3>/gi, (i, title) => '\n### ' + noTags(title))
    .replace(/<h4>(.+?)<\/h4>/gi, (i, title) => '\n#### ' + noTags(title))
    .replace(/<h2><\/h2>/gi, '')
    .replace(/<h3><\/h3>/gi, '')
    // <strong>
    .replace(/<strong>[ ]*|[ ]*<\/strong>/gi, '**')
    // <span>
    .replace(/<span.*?>/gi, '')
    .replace(/<\/span>/gi, '')
    // <div>
    .replace(/<div.*?>/gi, '')
    .replace(/<\/div>/gi, '')
    // <em>
    .replace(/<em>[ ]*|[ ]*<\/em>/gi, '_')
    // <del>
    .replace(/<del>[ ]*|[ ]*<\/del>/gi, '_')
    // <blockquote>
    .replace(/<blockquote[^>]*><p>\s*/gi, '> ')
    .replace(/<\/blockquote>/gi, '')
    // list
    .replace(/<ul>|<\/ul>/g, '')
    .replace(/<li>/g, '\n- ')
    .replace(/<\/li>/g, '')
    // <img>
    .replace(/[ ]width=".*?"/g, '')
    .replace(/[ ]height=".*?"/g, '')
    .replace(/[ ]data-srcset=".*?"/g, '')
    .replace(/[ ]sizes=".*?"/g, '')
    .replace(/[ ]data-id=".*?"/g, '')
    .replace(/[ ]data-link=".*?"/g, '')
    .replace(/<figure>/g, '')
    .replace(/<\/figure>/g, '')
    .replace(/data-src/g, 'src')
    .replace(/data-alt/g, 'alt')
    // <a>
    .replace(/<a href=["']https?:\/\/adeux-cestmieux\.com\/wp-cont.+?>/gis, '')
    .replace(/<a href=["']https?:\/\/adeux-cestmieux\.com\/\?attach.+?>/gis, '')
    .replace(/<a.+?href="(.*?)".*?>(.*?)<\/a>/gis, (i, src, txt) => `[${txt}](${src})`)
    .replace(/<img.+?src="(.*?)".+?alt="(.*?)".+?>/gim, (i, src, alt) => {
      const url = src.replace(/-\w{3,4}x\w{3,4}/i, ''); // Only HD pictures
      const name = url.match(/[^\/]*\.\w+$/i)[0];
      if (!alt || alt.length === 0) alt = name;
      return `<img alt="${alt}" src="./images/${name}">`;
    })

    .replace(/<\/a>/g, '')
    .replace(/<dl.*?>/g, '')
    .replace(/<\/dl>/g, '')
    .replace(/<dt.*?>/g, '')
    .replace(/<\/dt>/g, '')
    .replace(/<br.*?>/g, '')

    // <hr>
    .replace(/\n-\n\n/g, '\n---')
    .replace(/<hr.*?\/>/g, '\n---')

    // .replace(/<p[^>]*>\W<\/p>/g, "\n---")
    // .replace(/<h[234][^>]*>\W<\/h[234]>/g, "\n---")

    // Images with captions
    // .replace(
    //   /<figure.+?img.+?src="([^"]*)".+?alt="([^"]*)".+?<figcaption>([^<]*)<\/figcaption>.*?<\/figure>/gi,
    //   (match, src, alt, caption) => {
    //     const url = src.replace(/-\w{3,4}x\w{3,4}/i, ""); // Only HD pictures
    //     const name = url.match(/[^\/]*\.\w+$/i)[0];
    //     if (!alt || alt.length === 0) alt = name;
    //     return `<img alt="${alt}" src="./images/${name}" title="${caption}">`;
    //   }
    // )
    // // <img>
    // .replace(/<img src=["']\/.+?>/g, "")
    // // .replace(/<div class="wp-block-image">(.+?)<\/div>/gs, (m, c) => c)
    // // Instagram
    // // .replace(
    // //   /<figure class="wp-block-embed-instagram.+?href="([^\?]*).+?<\/figure>/gis,
    // //   (i, url) => `<instagram>${url}</instagram>`
    // // )
    // .replace(/\[(!\[.+?]\(.+?)]\(.+?\/\)/gis, (i, img) => img)
    // .replace(/<a.+?>!\[/gis, "![")
    // .replace(/\(https:\/\/adeux-cestmieux\.com/gi, "(")
    // .replace(/[ ]{0}\[[ ]/g, " [")
    // .replace(/<\/a>/gi, "")

    // // Gallery
    // .replace(
    //   /<ul.+?gallery[ ][^>]*>(.+?)<\/ul>/gis,
    //   (i, content) => `\n<div class="gallery">${content}\n<\/div>`
    // )
    // .replace(
    //   /<div.+?gallery[ ][^>]*>(.+?)<\/div>/gis,
    //   (i, content) => `\n<div class="gallery">${content}\n<\/div>`
    // )

    // // <ul>
    // .replace(
    //   /\n?<ul>(.+?)<\/ul>\s/gis,
    //   (i, list) =>
    //     list
    //       .replace(/\s*<ul>(.+?)<\/ul>/gis, (i, sublist) =>
    //         sublist.replace(/\n?<li>/gi, "\n\t- ").replace(/\s*<\/li>/gis, "")
    //       )
    //       .replace(/\s*<li>/gi, "\n- ")
    //       .replace(/\s*<\/li>/gi, "")
    //       .replace(/\s*<\/ul>\n/gis, "") + "\n"
    // )
    // // Delete useless tags
    // // .replace(/<figure[^>]*>(.*?)<\/figure>/gis, (m, c) => c)
    // // .replace(/<dl[^>]*>(.*?)<\/dl>/gis, (m, c) => c)
    // // .replace(/<dt[^>]*>(.*?)<\/dt>/gis, (m, c) => c)
    // // .replace(/<div>\s*(.*?)\s*<\/div>/gis, (m, c) => c)
    // // .replace(/<div class="a2cm-Gallery">(.*?)<\/div>/gis, (m, c) => c)
    // // .replace(/<div class="a2cm-Gallery-item">(.*?)<\/div>/gis, (m, c) => c)
    // // .replace(/<div class="blocks-gallery-item">(.*?)<\/div>/gis, (m, c) => c)
    // // .replace(/<div class="wp-block-image">(.*?)<\/div>/gis, (m, c) => c)
    // // .replace(/<li class="blocks-gallery-item">(.*?)<\/li>/gis, (m, c) => c)

    // // .replace(/<div class="wp-block-image">[^<]*<\/div>/gi, "")
    // // .replace(/<div id="attachment.+?>[^<]*<\/div>/gi, "")

    // // <style>
    // // .replace(/\s*<style.+?<\/style>\s*/gis, "\n")

    // <p>
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')

    // Misc
    // .replace(/><img/g, ">\n<img") // Add space before images
    // .replace(/\*\*[ ]\*\*/g, " ")
    // .replace(/_[ ]_/g, " ")
    // .replace(/\)!\[/g, ")\n![") // Fix gallery === 1 collapsing
    // .replace(/\)- !\[/g, ")\n- ![") // Fix gallery > 1 collapsing
    // .replace(/<br.*?>/g, "")
    // .replace(/\s?[	]/g, "")
    // .replace(/[ ]\[...]\n*/gs, "")
    .replace(/\n{2,}/g, '\n\n')
    .replace(/\n+/, '');

  // // <dd>
  // .replace(/><dd[^>]*>(.*?)<\/dd>/gs, (m, c) => ` title="${c}">`)
  // .replace(/<a[^>]*>/gs, "");

  post.markdown = formatted;

  return post;
}

async function saveContent(post) {
  const folder = path.join('src/pages/' + post.path);
  const file = path.join('src/pages/' + post.path + 'index.md');
  const content = post.frontmatter + '\n' + post.markdown;

  try {
    const isNew = await fsp.stat(file).then(() => false, () => true);
    if (isNew) {
      await fsp.mkdir(folder, {recursive: true});
      await fsp.writeFile(file, content);
      console.log(file);
    }
    return post;
  } catch (e) {
    console.error(e);
  }
}

async function saveImages(post) {
  const folder = path.join('src/pages/' + post.path + 'images/');
  const isNew = await fsp.stat(folder).then(() => false, () => true);
  if (isNew) {
    await fsp.mkdir(folder, {recursive: true});
    for (let i = 0; i < post.images.length; i++) {
      try {
        await new Promise(r => setTimeout(() => r(), 500));
        const {filename} = await downloadImage.image({
          url: post.images[i],
          dest: folder,
        });
        console.log(filename);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return post;
}

async function createGlobal(posts, format = 'md') {
  try {
    await fsp.mkdir('src/pages/', {recursive: true});

    if (format === 'md') {
      await fsp.writeFile('src/pages/global.md', '');
    } else if (format === 'html') {
      await fsp.writeFile('src/pages/global.html', '');
    } else {
      throw new Error();
    }

    for (let i = 0, n = posts.length; i < n; i++) {
      let content = '';
      let output = '';

      if (format === 'md') {
        content = posts[i].frontmatter + '\n' + posts[i].markdown;
        output = '.md';
      } else if (format === 'html') {
        content =
          '---\n' +
          posts[i].title.rendered +
          '\n' +
          posts[i].excerpt.rendered +
          '---\n' +
          '\n' +
          posts[i].content.rendered;
        output = '.html';
      }

      if (i > 0) content = '\n\n\n' + content;

      await fsp.appendFile('src/pages/global' + output, content);

      if (i === n - 1) console.log('src/pages/global' + output);
    }
    return posts;
  } catch (e) {
    console.error(e);
  }
}

function typography(str) {
  return str
    .replace(/&#8211;|&#ndash;|&#8212;|&mdash;/gim, '-')
    .replace(/&lsquo;|&rsquo;|&#8217;|&#039;/gim, "'")
    .replace(/&#8230;|…|&hellip;/gim, '...')
    .replace(/&amp;|&#038;/gim, '&')
    .replace(/&lt;/gim, '<')
    .replace(/&gt;/gim, '>')
    .replace(/<3/gim, '❤️')
    .replace(/&nbsp;/gim, ' ')
    .replace(/[ ]{2,}/gim, ' ');
}

function noTags(str) {
  if (str) {
    return str.replace(/<[^>]*>/g, '');
  }
  return str;
}
