import React from 'react';
import {graphql} from 'gatsby';
import Category from '../../templates/category';

const Page = ({data}) => {
  const excerpt = `Votre message a bien été envoyé. Merci beaucoup d'avoir pris le temps de nous
  écrire. Nous vous répondrons le plus vite possible.`;

  return (
    <>
      <Category title='Merci !' slug='contact/merci' excerpt={excerpt} img='' data={data} />
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
