import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

import {getFeaturedArticles} from './utils';

const Page = ({data}) => {
  const excerpt = `Ses canaux, ses vélos, ses maisons, son patrimoine artistique et bien d’autre encore…
  Découvrir Amsterdam est un vaste programme. Vous venez visiter la capitale bientôt ?  
  Que ce soit votre première fois à Amsterdam ou bien que vous connaissez déjà les rues du centre par coeur, 
  retrouvez ici tous nos articles et conseils pour préparer votre visite d’Amsterdam. 
  Nous les avons voulus aussi complet que possible.`;

  const articles = getFeaturedArticles(data, 'visiter-amsterdam');
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <>
      <Category
        title='Visiter Amsterdam'
        slug='visiter-amsterdam'
        excerpt={excerpt}
        img=''
        siteUrl={siteUrl}
        articles={articles}
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
    allStoryblokEntry(filter: {group_id: {eq: "29b6d049-cf34-486b-9c21-12c361af40a3"}}) {
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
    allMarkdownRemark(filter: {fields: {category: {eq: "visiter-amsterdam"}}}) {
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
