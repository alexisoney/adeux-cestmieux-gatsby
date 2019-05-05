import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

const Page = ({data}) => {
  const excerpt = `Ses canaux, ses vélos, ses maisons, son patrimoine artistique et bien d’autre encore…
  Découvrir Amsterdam est un vaste programme. Vous venez visiter la capitale bientôt ?  
  Que ce soit votre première fois à Amsterdam ou bien que vous connaissez déjà les rues du centre par coeur, 
  retrouvez ici tous nos articles et conseils pour préparer votre visite d’Amsterdam. 
  Nous les avons voulus aussi complet que possible.`;

  return (
    <>
      <Category
        title='Visiter Amsterdam'
        slug='visiter-amsterdam'
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
      filter: {fields: {category: {eq: "visiter-amsterdam"}}}
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
