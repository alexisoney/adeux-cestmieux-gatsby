import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

import {getFeaturedArticles} from '../utils';

const Page = ({data}) => {
  const excerpt = `“Vivre à Amsterdam, c’est avoir les avantages d’une capitale sans les inconvénients”. 
    Et oui, Il fait bon vivre à Amsterdam. L’idée de venir s’y installer vous fait follement envie ? 
    Ou bien, vous avez déjà sauté le pas de l’expatriation ? Nous partageons régulièrement notre expérience de 
    Français vivant à Amsterdam mais aussi des conseils et bons plans pour vous facilitez la vie. 
    Un sujet spécial sur l’expatriation à Amsterdam vous intéresse en particulier ?`;

  const articles = getFeaturedArticles(data, 'vivre-aux-pays-bas');
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <>
      <Category
        title='Vivre aux Pays-Bas'
        slug='vivre-aux-pays-bas'
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
    allStoryblokEntry(filter: {group_id: {eq: "7efb51fe-4dad-4bfd-a7d4-56e5b5b79dbc"}}) {
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
    allMarkdownRemark(filter: {fields: {category: {eq: "vivre-aux-pays-bas"}}}) {
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
