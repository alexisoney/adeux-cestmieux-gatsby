import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../layouts/layout';
import FeaturedArticles from './../components/FeaturedArticles';
import {isArray} from 'util';

export default ({data}) => {
  const post = data.markdownRemark;
  const date = buildDate(post.fields.date, post.fields.category);
  const src = `./images/${data.markdownRemark.frontmatter.hero.name}`;
  console.log(src);
  const title = post.frontmatter.title
    .replace(/\s\?/g, '&nbsp;?')
    .replace(/\s:/g, '&nbsp;:')
    .replace(/\s!/g, '&nbsp;!');
  const html = post.html
    .replace(/<img[^>]*>/g, el => optimizeImages(el))
    .replace(/\s\?/g, '&nbsp;?')
    .replace(/\s:/g, '&nbsp;:')
    .replace(/\s!/g, '&nbsp;!');

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
      <FeaturedArticles posts={data.allMarkdownRemark.edges} fluid />
    </Layout>
  );
};

function buildDate(date, category) {
  const timestamp = new Date(date);
  let dateString;
  if (['visiter-amsterdam', 'vivre-aux-pays-bas'].includes(category)) {
    let period = (new Date() - timestamp) / 1000 / 60 / 60 / 24;
    let unit;
    if (period < 7) {
      period = Math.floor(period);
      unit = period > 1 ? 'jours' : 'jour';
    } else if (period < 35) {
      period = Math.floor(period / 7);
      unit = period > 1 ? 'semaines' : 'semaine';
    } else if (period < 371) {
      period = Math.floor(period / 30.5);
      unit = 'mois';
    } else {
      period = Math.floor(period / 365);
      unit = period > 1 ? 'ans' : 'an';
    }
    dateString = `Mise à jour il y ${period} ${unit}`;
  } else {
    const day = timestamp.getDate();
    const year = timestamp.getFullYear();
    let month;
    switch (timestamp.getMonth()) {
      case 0:
        month = 'janvier';
        break;
      case 1:
        month = 'février';
        break;
      case 2:
        month = 'mars';
        break;
      case 3:
        month = 'avril';
        break;
      case 4:
        month = 'mai';
        break;
      case 5:
        month = 'juin';
        break;
      case 6:
        month = 'juillet';
        break;
      case 7:
        month = 'août';
        break;
      case 8:
        month = 'septembre';
        break;
      case 9:
        month = 'octobre';
        break;
      case 10:
        month = 'novembre';
        break;
      default:
        month = 'décembre';
    }
    dateString = `Publié le ${day} ${month} ${year}`;
  }
  return dateString;
}

const optimizeImages = el => {
  let src = el.match(/src=["'](.+?)\./);
  src = isArray(src) ? src[1] : '';
  let alt = el.match(/alt=["](.+?)["]/);
  alt = isArray(alt) ? alt[1] : '';
  let title = el.match(/title=["](.+?)["]/);
  title = isArray(title) ? title[1] : '';

  if (src === '') {
    return null;
  }

  return `<div class="post__image-container">
  <picture>
    <source type="image/webp" data-srcset="${src}-400w.webp 400w, ${src}-800w.webp 800w, ${src}-1600w.webp 1600w" sizes="(max-width: 770px) 100vw, 770px">
    <source type="image/jpeg" data-srcset="${src}-400w.jpeg 400w, ${src}-800w.jpeg 800w, ${src}-1600w.jpeg 1600w" sizes="(max-width: 770px) 100vw, 770px"> 
    <img class="post__image lazyload" src="${src}-20w.jpeg" alt="${alt}" title="${title}" />
  </picture>
    </div>`;
};

export const query = graphql`
  query($slug: String!, $category: String!) {
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
