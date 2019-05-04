import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import {Helmet} from 'react-helmet';
import siteMetadata from '../constant/siteMetadata';
import {colors} from '../constant/style';
import Layout from '../layouts/layout';
import FeaturedArticles from '../components/FeaturedArticles';
import prettyText from '../utils/prettyText';
import prettyDate from '../utils/prettyDate';
import rehypeReact from 'rehype-react';
import path from 'path';

const Ending = styled.p`
  margin: 8em 0 4em;
  font-size: 0.75em;
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  &::before {
    content: '';
    display: block;
    margin: 0 auto 1em;
    height: 0.2em;
    width: 4em;
    background-color: ${colors.gamma};
  }
`;

export default ({data}) => {
  const url = data.site.siteMetadata.siteUrl;
  const post = data.markdownRemark;
  const slug = post.fields.slug;
  const src = `${url}/images/${slug}/${data.markdownRemark.frontmatter.hero.name}`;
  const date = prettyDate(post.fields.date, post.fields.category);
  const title = prettyText(post.frontmatter.title);

  const Gallery = ({children}) => <div className='gallery'>{children}</div>;

  const optimizedImages = ({alt, src, title}) => {
    const fileExtension = path.extname(src);
    const needOptimization = ['.jpg', '.jpeg', '.png'].includes(fileExtension.toLowerCase());

    if (needOptimization) {
      const fileName = path.basename(src, fileExtension);
      const basePath = `${url}/images/${slug}/${fileName}`;

      const sizes = '(max-width: 770px) 100vw, 770px';
      function setSrcSet(ext) {
        return `${basePath}-400w.${ext} 400w, ${basePath}-800w.${ext} 800w, ${basePath}-1600w.${ext} 1600w`;
      }

      return (
        <div className='post__image-container'>
          <picture>
            <source type='image/webp' data-srcset={setSrcSet('webp')} sizes={sizes} />
            <source type='image/jpeg' data-srcset={setSrcSet('jpeg')} sizes={sizes} />
            <img
              className='post__image lazyload'
              alt={alt}
              title={title}
              src={`${basePath}-20w.jpeg`}
            />
          </picture>
        </div>
      );
    }
    return (
      <div className='post__image-container'>
        <img src={src} alt={alt} title={title ? title : ''} />
      </div>
    );
  };

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      img: optimizedImages,
      gallery: Gallery,
    },
  }).Compiler;

  return (
    <Layout instagram={data.allInstaNode}>
      <Helmet>
        <title>{post.frontmatter.title_seo ? post.frontmatter.title_seo : title}</title>
        <meta name='description' content={post.frontmatter.excerpt} />
        <meta
          property='og:title'
          content={post.frontmatter.title_seo ? post.frontmatter.title_seo : title}
        />
        <meta property='og:description' content={post.frontmatter.excerpt} />
        <meta property='og:image' content={`${src}-1600w.jpeg`} />
        <meta property='og:url' content={`${url}/${slug}`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={siteMetadata.title} />
        <meta name='twitter:image:alt' content={slug} />
      </Helmet>
      <div className='hero'>
        <picture>
          <source
            type='image/webp'
            srcSet={`${src}-400w.webp 400w, ${src}-800w.webp 800w, ${src}-1600w.webp 1600w, ${src}-3200w.webp 3200w`}
            sizes='(max-width: 1600px) 100vw, 1600px'
          />
          <source
            type='image/jpeg'
            srcSet={`${src}-400w.jpeg 400w, ${src}-800w.jpeg 800w, ${src}-1600w.jpeg 1600w`}
            sizes='(max-width: 1600px) 100vw, 1600px'
          />
          <img className='hero__image' src={`${src}-400w.jpeg`} alt={post.fields.slug} />
        </picture>
      </div>
      <main className='post'>
        <p className='post__date'>{date}</p>
        <h1 className='post__title' dangerouslySetInnerHTML={{__html: title}} />
        <p className='post__reading-time'>
          {post.timeToRead} minute{post.timeToRead > 1 ? 's' : ''} de lecture
        </p>
        {renderAst(post.htmlAst)}
        <Ending>End of Story</Ending>
      </main>
      <FeaturedArticles title url={url} posts={data.allMarkdownRemark.edges} fluid />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!, $category: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      timeToRead
      htmlAst
      fields {
        slug
        category
        date
      }
      frontmatter {
        title
        title_seo
        hero {
          name
        }
        excerpt
      }
    }
    allMarkdownRemark(
      filter: {fields: {category: {eq: $category}, slug: {ne: $slug}}}
      sort: {fields: [fields___date], order: DESC}
      limit: 3
    ) {
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
