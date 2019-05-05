import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../layouts/layout';
import IndexSlider from '../components/IndexSlider/index';

export default props => (
  <Layout>
    <IndexSlider
      url={props.data.site.siteMetadata.siteUrl}
      posts={props.data.allMarkdownRemark.edges}
    />
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(sort: {fields: [fields___date], order: DESC}) {
      edges {
        node {
          id
          fields {
            slug
            date
          }
          frontmatter {
            title
            hero {
              name
            }
          }
        }
      }
    }
  }
`;
