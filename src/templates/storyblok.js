import React from 'react';
import {Helmet} from 'react-helmet';
import {graphql} from 'gatsby';

import siteMetadata from '../constant/siteMetadata';
import formatDate from '../utils/prettyDate';
import {getTimeToRead} from '../utils';
import {getFeaturedArticles} from '../utils';

import Cloudinary from '../components/Cloudinary';
import Layout from '../layouts/layout';
import Ending from '../components/Ending';
import FeaturedArticles from '../components/FeaturedArticles';
import Text from '../components/Text';

export default ({data, pageContext}) => {
  const {blocks, category, createdAt, description, image, slug, title} = pageContext;
  const date = createdAt && category ? formatDate(createdAt, category) : undefined;
  const timeToRead = blocks ? getTimeToRead(blocks) : undefined;
  const featuredArticles = getFeaturedArticles(data, pageContext.markdownCategory, 3);
  const instagram = data.allInstaNode.edges;

  return (
    <Layout instagram={instagram}>
      <Helmet>
        <title>
          {title} - {siteMetadata.title}
        </title>
        <meta name='description' content={description} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={`${title} - ${siteMetadata.title}`} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:image:secure_url' content={image} />
        <meta property='og:url' content={`${siteMetadata.url}/${slug}/`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={siteMetadata.title} />
        <meta name='twitter:image:alt' content={title} />
      </Helmet>

      {image && (
        <div className='hero'>
          <img className='hero__image' src={image} alt={title} />
        </div>
      )}

      <main className='post'>
        {date && <p className='post__date'>{date}</p>}
        {title && <h1 className='post__title'>{title}</h1>}
        {timeToRead && (
          <p className='post__reading-time'>
            {timeToRead} minute{timeToRead > 1 ? 's' : ''} de lecture
          </p>
        )}

        {blocks &&
          blocks.map(({component, _uid, ...props}) => {
            switch (component) {
              case 'text':
                const {content} = props;
                return <Text key={_uid} text={content} />;
              case 'image':
                const {alt, image} = props;
                return <Cloudinary key={_uid} alt={alt} url={image} />;
              default:
                return null;
            }
          })}

        <Ending>End of Story</Ending>
      </main>
      <FeaturedArticles title url={siteMetadata.url} articles={featuredArticles} fluid />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!, $category: String!, $markdownCategory: String!) {
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
    allStoryblokEntry(filter: {group_id: {eq: $category}, slug: {ne: $slug}}) {
      edges {
        node {
          name
          created_at
          slug
          content
        }
      }
    }
    allMarkdownRemark(filter: {fields: {category: {eq: $markdownCategory}}}) {
      edges {
        node {
          id
          fields {
            category
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
