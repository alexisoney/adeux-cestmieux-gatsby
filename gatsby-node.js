const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);
const categories = require('./src/constant/categories');
const utils = require('./utils');

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const filePath = createFilePath({node, getNode, basePath: `pages`});
    const category = filePath.match(/\/(.+?)\//)[1];
    const date = filePath.match(/\d{4}-\d{2}-\d{2}/)[0];
    const slug = filePath.match(/__(.+?)\/$/)[1];
    createNodeField({
      node,
      name: `category`,
      value: category,
    }),
      createNodeField({
        node,
        name: `date`,
        value: date,
      }),
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      });
  }
};

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const markdownRemark = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              category
            }
          }
        }
      }
    }
  `);

  if (markdownRemark.errors) throw markdownRemark.errors;

  markdownRemark.data.allMarkdownRemark.edges.forEach(({node}) => {
    let storyblokCategory;
    switch (node.fields.category) {
      case 'visiter-amsterdam':
        storyblokCategory = categories.visiterAmsterdam;
        break;
      case 'vivre-aux-pays-bas':
        storyblokCategory = categories.vivreAuxPaysBas;
        break;
      case 'blog':
      default:
        storyblokCategory = categories.blog;
        break;
    }

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.fields.slug,
        category: node.fields.category,
        storyblokCategory: storyblokCategory,
      },
    });
  });

  const storyblok = await graphql(
    `
      {
        allStoryblokEntry(filter: {field_component: {eq: "post"}}) {
          edges {
            node {
              name
              created_at
              slug
              content
              group_id
            }
          }
        }
      }
    `
  );

  if (storyblok.errors) throw storyblok.errors;

  storyblok.data.allStoryblokEntry.edges.forEach(({node}) => {
    const context = utils.createStoryblokPageContext(node);

    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/storyblok.js`),
      context,
    });
  });
};
