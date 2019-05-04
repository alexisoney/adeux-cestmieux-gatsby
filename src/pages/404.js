import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

const Page = ({data}) => {
  const excerpt = '';

  return (
    <>
      <Category title='Oups ! Pas introuvable' slug='404' excerpt={excerpt} img='' data={data} />
    </>
  );
};

export default Page;

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
          fields {
            slug
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
