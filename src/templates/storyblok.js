import React from 'react';
import {Helmet} from 'react-helmet';
import SbEditable from 'storyblok-react';
import {graphql} from 'gatsby';

import siteMetadata from '../constant/siteMetadata';
import formatDate from '../utils/prettyDate';
import {getTimeToRead} from '../utils';
import {getFeaturedArticles} from '../utils';
import {lazyloadImage} from '../utils';

import CallToAction from '../components/CallToAction';
import Cloudinary from '../components/Cloudinary';
import Gallery from '../components/Gallery';
import Heading from '../components/Heading';
import Layout from '../layouts/layout';
import Ending from '../components/Ending';
import FeaturedArticles from '../components/FeaturedArticles';
import Quote from '../components/Quote';
import TableOfContents from '../components/TableOfContents';
import Text from '../components/Text';
import Video from '../components/Video';
import Newsletter from '../components/Newsletter';

export default ({data, pageContext}) => {
  const {blocks, category, createdAt, customDate, description, cover, slug, title} = pageContext;
  const date = formatDate(customDate || createdAt, category);
  const timeToRead = blocks ? getTimeToRead(blocks) : undefined;
  const featuredArticles = getFeaturedArticles(data, pageContext.markdownCategory, 3);
  const instagram = data ? data.allInstaNode.edges : null;

  function loadLazyImages() {
    const images = Array.from(document.querySelectorAll('source, img'));
    images.forEach(img => lazyloadImage(img));
  }

  return (
    <Layout instagram={instagram}>
      <Helmet>
        <title>
          {title} - {siteMetadata.title}
        </title>
        <link rel='canonical' href={`${siteMetadata.url}/${slug}`} />
        <meta name='description' content={description} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={`${title} - ${siteMetadata.title}`} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={cover} />
        <meta property='og:image:secure_url' content={cover} />
        <meta property='og:url' content={`${siteMetadata.url}/${slug}`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={siteMetadata.title} />
        <meta name='twitter:image:alt' content={title} />

        <script type='application/ld+json'>
          {`{
              "@context": "https://schema.org",
              "@type": "Article",
              ${createdAt && `"datePublished": "${createdAt}",`}
              ${customDate && `"dateModified": "${customDate}",`}
              "headline": "${title}",
              "image": "${cover}",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${siteMetadata.url}/${slug}"
              },
              "author": {
                "@type": "Person",
                "name": "Clémence Taillez"
              },
              "publisher": {
                "@type": "Organization",
                "name": "${siteMetadata.title}"
              },
              "description": "${description}"
            }`}
        </script>
      </Helmet>

      {cover && (
        <div className='hero'>
          <div className='hero__image'>
            <Cloudinary lazyload={false} onload={loadLazyImages} src={cover} alt={title} wide />
          </div>
        </div>
      )}

      <main className='post'>
        {date && slug !== 'about' && <p className='post__date'>{date}</p>}
        {title && <h1 className='post__title'>{title}</h1>}
        {!!timeToRead && slug !== 'about' && (
          <p className='post__reading-time'>
            {timeToRead} minute{timeToRead > 1 ? 's' : ''} de lecture
          </p>
        )}

        {blocks &&
          blocks.map(block => {
            const {component: type, _uid} = block;

            let component;

            switch (type) {
              case 'cta':
                const {button, image, description, link, title} = block;
                component = (
                  <CallToAction
                    button={button}
                    image={image}
                    description={description}
                    link={link}
                    title={title}
                  />
                );
                break;
              case 'divider':
                component = <hr />;
                break;
              case 'gallery':
                const {images} = block;
                component = <Gallery images={images} />;
                break;
              case 'heading':
                const {text, level, tocText} = block;
                component = <Heading text={text} level={level} tocText={tocText} />;
                break;
              case 'image':
                const {alt, src, wide} = block;
                component = <Cloudinary alt={alt} src={src} wide={wide} />;
                break;
              case 'newsletter':
                component = <Newsletter position='ARTICLE' />;
                break;
              case 'quote':
                component = <Quote content={block.content} />;
                break;
              case 'toc':
                const {mapZoom, mapCenter} = block;
                component = (
                  <TableOfContents content={blocks} mapZoom={mapZoom} mapCenter={mapCenter} />
                );
                break;
              case 'text':
                const {content, quote} = block;
                component = <Text text={content} quote={quote} />;
                break;
              case 'video':
                component = <Video src={block.src} />;
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

        {slug !== 'about' && <Ending>End of Story</Ending>}
      </main>
      {slug !== 'about' && (
        <FeaturedArticles title url={siteMetadata.url} articles={featuredArticles} fluid />
      )}
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!, $category: Int, $markdownCategory: String!) {
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
    allStoryblokEntry(filter: {parent_id: {eq: $category}, slug: {ne: $slug}}) {
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
