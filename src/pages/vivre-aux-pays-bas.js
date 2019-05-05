import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

const Page = ({data}) => {
  const excerpt = `“Vivre à Amsterdam, c’est avoir les avantages d’une capitale sans les inconvénients”. 
    Et oui, Il fait bon vivre à Amsterdam. L’idée de venir s’y installer vous fait follement envie ? 
    Ou bien, vous avez déjà sauté le pas de l’expatriation ? Nous partageons régulièrement notre expérience de 
    Français vivant à Amsterdam mais aussi des conseils et bons plans pour vous facilitez la vie. 
    Un sujet spécial sur l’expatriation à Amsterdam vous intéresse en particulier ?`;

  return (
    <>
      <Category
        title='Vivre aux Pays-Bas'
        slug='vivre-aux-pays-bas'
        excerpt={excerpt}
        img=''
        data={data}
      />
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
      filter: {fields: {category: {eq: "vivre-aux-pays-bas"}}}
      sort: {fields: [fields___date], order: DESC}
    ) {
      edges {
        node {
          id
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
