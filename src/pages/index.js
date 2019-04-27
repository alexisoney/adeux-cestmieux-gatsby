import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../layouts/layout';
import IndexSlider from '../components/IndexSlider/index';

export default props => (
  <Layout>
    <IndexSlider posts={props.data.allMarkdownRemark.edges} />
  </Layout>
);

// childImageSharp {
//   fluid {
//     ...GatsbyImageSharpFluid_withWebp
//   }
// }

export const query = graphql`
  query {
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
              publicURL
            }
          }
        }
      }
    }
  }
`;
