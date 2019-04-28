import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

const Page = ({data}) => {
  const excerpt = '';

  return (
    <>
      <Category title='Blog' excerpt={excerpt} data={data} />
    </>
  );
};

export default Page;

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {fields: {category: {eq: "blog"}}}
      sort: {fields: [fields___date], order: DESC}
    ) {
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
