const categories = require('./src/constant/categories');

module.exports = Object.freeze({
  createStoryblokPageContext: function createStoryblokPageContext(node) {
    const category = node.parent_id;
    const createdAt = node.first_published_at || node.created_at;
    const slug = node.slug;
    const title = node.name;
    const content = typeof node.content === 'string' ? JSON.parse(node.content) : node.content;
    const {content: blocks, description, cover, customDate} = content;

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
      cover,
      customDate,
      slug,
      title,
      markdownCategory,
    };
  },
});
