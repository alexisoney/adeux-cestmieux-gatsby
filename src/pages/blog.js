import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

const Page = ({data}) => {
  const excerpt = `Retrouvez ici tous nos articles de blog. Je partage ici tous mes coups de coeur. 
    Looks, déco, voyage, réflexion, avis … J’écris au grès de mes envies et de mes inspirations.`;

  return (
    <>
      <Category title='Blog' slug='blog' excerpt={excerpt} img='' data={data} />
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
    allMarkdownRemark(
      filter: {fields: {category: {eq: "blog"}}}
      sort: {fields: [fields___date], order: DESC}
    ) {
      edges {
        node {
          id
          fields {
            slug
            date
            category
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
