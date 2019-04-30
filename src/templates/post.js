import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../layouts/layout';
import FeaturedArticles from '../components/FeaturedArticles';
import prettyText from '../utils/prettyText';
import prettyDate from '../utils/prettyDate';
import makeImgTagsResponsive from '../utils/makeImgTagsResponsive';

export default ({data}) => {
  const url = data.site.siteMetadata.siteUrl;
  const post = data.markdownRemark;
  const src = `${url}/images/${post.fields.slug}/${data.markdownRemark.frontmatter.hero.name}`;
  const date = prettyDate(post.fields.date, post.fields.category);
  const title = prettyText(post.frontmatter.title);
  const html = prettyText(post.html).replace(/<img[^>]*>/g, el =>
    makeImgTagsResponsive(el, post.fields.slug, url)
  );

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
        <div dangerouslySetInnerHTML={{__html: html}} />
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
      html
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
