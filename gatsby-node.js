const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

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

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;
  return graphql(`
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
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          slug: node.fields.slug,
          category: node.fields.category,
        },
      });
    });
  });
};
