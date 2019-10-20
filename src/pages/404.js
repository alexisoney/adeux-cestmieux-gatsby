import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

import {getFeaturedArticles} from '../utils';

const Page = ({data}) => {
  const excerpt = `Cette page n'existe pas ou plus. Mais pas de souci, voici tous nos articles !`;

  const articles = getFeaturedArticles(data);
  const siteUrl = data.site.siteMetadata.siteUrl;
  const instagram = data.allInstaNode.edges;

  return (
    <>
      <Category
        title='Oups ! Pas introuvable'
        slug='404'
        excerpt={excerpt}
        img=''
        siteUrl={siteUrl}
        articles={articles}
        instagram={instagram}
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
    allInstaNode(sort: {fields: timestamp, order: DESC}, limit: 5) {
      edges {
        node {
          id
          likes
          username
          localFile {
            childImageSharp {
              fluid(maxWidth: 220, maxHeight: 220) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
    allStoryblokEntry(filter: {slug: {ne: "about"}}) {
      edges {
        node {
          name
          created_at
          slug
          content
          parent_id
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
