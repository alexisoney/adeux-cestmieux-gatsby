import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

import {getFeaturedArticles} from './utils';

const Page = ({data}) => {
  const excerpt = `Retrouvez ici tous nos articles de blog. Je partage ici tous mes coups de coeur. 
    Looks, déco, voyage, réflexion, avis … J’écris au grès de mes envies et de mes inspirations.`;

  const articles = getFeaturedArticles(data, 'blog');
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <>
      <Category
        title='Blog'
        slug='blog'
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
    allStoryblokEntry(filter: {group_id: {eq: "c645badc-e097-42f6-985e-c57138768d61"}}) {
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
    allMarkdownRemark(filter: {fields: {category: {eq: "blog"}}}) {
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
