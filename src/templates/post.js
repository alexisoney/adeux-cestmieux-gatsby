import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../layouts/layout';
import FeaturedArticles from '../components/FeaturedArticles';
import prettyText from '../utils/prettyText';
import prettyDate from '../utils/prettyDate';
import rehypeReact from 'rehype-react';
import path from 'path';

export default ({data}) => {
  const url = data.site.siteMetadata.siteUrl;
  const post = data.markdownRemark;
  const slug = post.fields.slug;
  const src = `${url}/images/${slug}/${data.markdownRemark.frontmatter.hero.name}`;
  const date = prettyDate(post.fields.date, post.fields.category);
  const title = prettyText(post.frontmatter.title);

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
    return <img src={src} alt={alt} title={title ? title : ''} />;
  };

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {img: optimizedImages},
  }).Compiler;

  return (
    <Layout instagram={data.allInstaNode}>
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
      </main>
      <FeaturedArticles url={url} posts={data.allMarkdownRemark.edges} fluid />
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
        hero {
          name
        }
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
