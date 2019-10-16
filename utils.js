const categories = require('./src/constant/categories');

module.exports = Object.freeze({
  createStoryblokPageContext: function createStoryblokPageContext(node) {
    const category = node.group_id;
    const createdAt = node.created_at;
    const slug = node.slug;
    const title = node.name;
    const {content: blocks, description, image} = node.content;

    let markdownCategory;
    switch (category) {
      case categories.visiterAmsterdam:
        markdownCategory = 'visiter-amsterdam';
        break;
      case categories.vivreAuxPaysBas:
        markdownCategory = 'vivre-aux-pays-bas';
        break;
      case categories.blog:
      default:
        markdownCategory = 'blog';
        break;
    }

    return {
      blocks,
      category,
      createdAt,
      description,
      image,
      slug,
      title,
      markdownCategory,
    };
  },
});
