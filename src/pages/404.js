import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

import {getFeaturedArticles} from './utils';

const Page = ({data}) => {
  const excerpt = `Cette page n'existe pas ou plus. Mais pas de souci, voici tous nos articles !`;

  const articles = getFeaturedArticles(data);
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <>
      <Category
        title='Oups ! Pas introuvable'
        slug='404'
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
    allStoryblokEntry {
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
    allMarkdownRemark {
      edges {
        node {
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
