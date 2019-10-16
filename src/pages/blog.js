import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

import {getFeaturedArticles} from '../utils';

const Page = ({data}) => {
  const excerpt = `Retrouvez ici tous nos articles de blog. Je partage ici tous mes coups de coeur. 
    Looks, déco, voyage, réflexion, avis … J’écris au grès de mes envies et de mes inspirations.`;

  const articles = getFeaturedArticles(data, 'blog');
  const siteUrl = data.site.siteMetadata.siteUrl;
  const instagram = data.allInstaNode.edges;

  return (
    <>
      <Category
        title='Blog'
        slug='blog'
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
    allStoryblokEntry(filter: {parent_id: {eq: 2560611}}) {
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
