export function getTimeToRead(blocks) {
  if (blocks) {
    let wordsCounter = 0;
    blocks.forEach(({component, content}) => {
      if (component === 'text') {
        wordsCounter += content.split(/\s/g).length;
      }
    });

    const wordsPerMinute = 200;
    const timeToRead = Math.ceil(wordsCounter / wordsPerMinute);

    return timeToRead;
  }

  throw new Error('blocks is undefined');
}

export function getFeaturedArticles(data, category = 'blog', slice) {
  let storyblok;
  if (data.allStoryblokEntry) {
    storyblok = data.allStoryblokEntry.edges.map(({node}) => {
      const {name, slug, created_at} = node;
      const {_uid, image, date} = JSON.parse(node.content);
      return {
        key: _uid,
        date: date ? new Date(date) : new Date(created_at),
        title: name,
        slug,
        image,
        category: category,
      };
    });
  }

  let markdownRemark;
  if (data.allMarkdownRemark) {
    markdownRemark = data.allMarkdownRemark.edges.map(({node}) => {
      const image = `${data.site.siteMetadata.siteUrl}/images/${node.fields.slug}/${
        node.frontmatter.hero.name
      }`;
      return {
        key: node.id,
        date: new Date(node.fields.date),
        title: node.frontmatter.title,
        image,
        slug: node.fields.slug,
        category: category,
      };
    });
  }

  let articles;
  if (storyblok && markdownRemark) {
    articles = storyblok.concat(markdownRemark);
  } else {
    articles = storyblok ? storyblok : markdownRemark;
  }

  const sortedArticles = articles.sort((a, b) => b.date - a.date);

  if (typeof slice === 'number') return sortedArticles.slice(0, slice);

  return sortedArticles;
}
