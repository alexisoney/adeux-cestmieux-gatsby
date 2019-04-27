import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../layouts/layout';
import FeaturedArticles from './../components/FeaturedArticles';

export default ({data}) => {
  const post = data.markdownRemark;
  const date = buildDate(post.fields.date, post.fields.category);
  const hero = `${data.markdownRemark.frontmatter.hero.publicURL}?nf_resize=fit&w=`;
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
        <img
          data-srcset={`${hero}400 400w, ${hero}800 800w, ${hero}1600 1600w, ${hero}3200 3200w`}
          sizes="(max-width: 1600px) 100vw, 1600px"
          data-src={`${hero}400`}
          alt={post.fields.slug}
          className='hero__image lazyload'
        />
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

const optimizeImages = (el) => {
  const src = el.match(/src=["'](.+?)['"]/)[1];
  const srcset = `${src}?nf_resize=fit&w=`;
  const alt = el.match(/alt=["'](.+?)['"]/)[1];
  const title = el.match(/alt=["'](.+?)['"]/)[1];
  return (
    `<img class="lazyload"
      data-srcset="${srcset}400 400w, ${srcset}800 800w, ${srcset}1600 1600w"
      data-src="${srcset}400"
      sizes="(max-width: 770px) 100vw, 770px"
      alt="${alt ? alt : ''}"
      title="${title ? title : ''}" />`
  )
}

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
          publicURL
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
              publicURL
            }
          }
        }
      }
    }
  }
`;
