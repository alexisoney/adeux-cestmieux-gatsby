import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../layouts/layout';
import IndexSlider from '../components/IndexSlider/index';

export default props => {
  const storyblok = props.data.allStoryblokEntry.edges.map(({node}) => {
    const {_uid, image, date} = JSON.parse(node.content);
    return {
      date: date ? new Date(date) : new Date(node.created_at),
      key: _uid,
      slug: node.slug,
      image,
      title: node.name,
    };
  });

  const markdownRemark = props.data.allMarkdownRemark.edges.map(({node}) => {
    return {
      date: new Date(node.fields.date),
      key: node.id,
      slug: node.fields.slug,
      image: node.frontmatter.hero.name,
      title: node.frontmatter.title,
    };
  });

  const posts = storyblok.concat(markdownRemark);
  const sortedPosts = posts.sort((a, b) => b.date - a.date);

  return (
    <Layout>
      <IndexSlider url={props.data.site.siteMetadata.siteUrl} posts={sortedPosts} />
    </Layout>
  );
};

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
