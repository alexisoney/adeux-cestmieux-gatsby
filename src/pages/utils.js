export function getFeaturedArticles(data, category = 'blog') {
  const storyblok = data.allStoryblokEntry.edges.map(({node}) => {
    const {name, slug, created_at} = node;
    const {_uid, image} = JSON.parse(node.content);
    return {key: _uid, date: created_at, title: name, slug, image};
  });

  const markdownRemark = data.allMarkdownRemark.edges.map(({node}) => {
    const image = `${data.site.siteMetadata.siteUrl}/images/${node.fields.slug}/${
      node.frontmatter.hero.name
    }`;
    return {
      key: node.id,
      date: node.fields.date,
      title: node.frontmatter.title,
      image,
      slug: node.fields.slug,
      category: category,
    };
  });

  const articles = storyblok.concat(markdownRemark);

  return articles;
}
