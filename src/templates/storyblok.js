import React from 'react';
import {Helmet} from 'react-helmet';
import SbEditable from 'storyblok-react';
import {graphql} from 'gatsby';

import siteMetadata from '../constant/siteMetadata';
import formatDate from '../utils/prettyDate';
import {getTimeToRead} from '../utils';
import {getFeaturedArticles} from '../utils';

import Cloudinary from '../components/Cloudinary';
import Gallery from '../components/Gallery';
import Heading from '../components/Heading';
import Layout from '../layouts/layout';
import Ending from '../components/Ending';
import FeaturedArticles from '../components/FeaturedArticles';
import TableOfContents from '../components/TableOfContents';
import Text from '../components/Text';

export default ({data, pageContext}) => {
  const {blocks, category, createdAt, customDate, description, cover, slug, title} = pageContext;
  const date = formatDate(customDate || createdAt, category);
  const timeToRead = blocks ? getTimeToRead(blocks) : undefined;
  const featuredArticles = getFeaturedArticles(data, pageContext.markdownCategory, 3);
  const instagram = data ? data.allInstaNode.edges : null;

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
        <meta property='og:image' content={cover} />
        <meta property='og:image:secure_url' content={cover} />
        <meta property='og:url' content={`${siteMetadata.url}/${slug}/`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={siteMetadata.title} />
        <meta name='twitter:image:alt' content={title} />
      </Helmet>

      {cover && (
        <div className='hero'>
          <div className='hero__image'>
            <Cloudinary
              src={cover}
              alt={title}
              sizes={'(max-width: 1060px) 100vw, 1060px'}
              srcset={[400, 800, 1060, 2120]}
            />
          </div>
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
          blocks.map(block => {
            const {component: type, _uid} = block;

            let component;

            switch (type) {
              case 'gallery':
                const {images} = block;
                component = <Gallery images={images} />;
                break;
              case 'heading':
                const {text, level} = block;
                component = <Heading text={text} level={level} />;
                break;
              case 'image':
                const {alt, src} = block;
                component = <Cloudinary alt={alt} src={src} />;
                break;
              case 'toc':
                component = <TableOfContents content={blocks} />;
                break;
              case 'text':
                const {content} = block;
                component = <Text text={content} />;
                break;
              default:
                component = null;
            }

            return (
              <SbEditable key={_uid} content={block}>
                <div>{component}</div>
              </SbEditable>
            );
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
