import React from 'react';
import styled from 'styled-components';
import {graphql} from 'gatsby';
import {Helmet} from 'react-helmet';
import siteMetadata from '../constant/siteMetadata';
import {colors, fonts} from '../constant/style';
import Layout from '../layouts/layout';
import FeaturedArticles from '../components/FeaturedArticles';
import RelatedArticle from '../components/RelatedArticle';
import prettyText from '../utils/prettyText';
import prettyDate from '../utils/prettyDate';
import rehypeReact from 'rehype-react';
import path from 'path';
import marked from 'marked';
import Script from 'react-load-script';
import {getFeaturedArticles} from '../utils';
import {lazyloadImage} from '../utils';

const TableOfContents = styled.div`
  background-color: ${colors.omega};
  padding: 40px;
  margin: 0 0 48px;

  & .TOC-title {
    margin: 0 0 10px;
  }
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  & li {
    margin: 8px 0;
    position: relative;
  }

  & li a {
    font-size: 20px;
    color: ${colors.beta};
    font-family: ${fonts.beta};
    font-weight: normal;
    text-decoration: none;
    transition: padding 0.2s ease-out;
    transition-delay: 0.1s;
    &:hover {
      padding-left: 15px;
      transition-delay: 0s;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0.85rem;
      left: 0;
      /* transform: translateY(-50%); */
      width: 6px;
      height: 6px;
      border-radius: 100px;
      background-color: ${colors.beta};
      opacity: 0;
      transition: opacity 0.1s ease-out;
      transition-delay: 0s;
    }
    &:hover:before {
      opacity: 1;
      transition-delay: 0.1s;
    }
  }
  & li ul {
    margin-bottom: 16px;
    padding-left: 8px;
  }
  & li ul li {
    margin: 0;
  }
  & li ul li a {
    font-size: 16px;
    color: ${colors.alpha};
    &:before {
      background-color: ${colors.alpha};
    }
  }
`;

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

const Anchor = styled.span`
  display: block;
  position: relative;
  top: -80px;
  visibility: hidden;
`;

const H2 = ({children}) => {
  const title = children[0];
  const anchor = getAnchor(title);
  if (anchor) {
    const cleanTitle = hideAnchor(title, anchor);
    return (
      <>
        <Anchor name={anchor} />
        <h2>{cleanTitle}</h2>
      </>
    );
  }
  return <h2>{children}</h2>;
};

const H3 = ({children}) => {
  const title = children[0];
  const anchor = getAnchor(title);
  if (anchor) {
    const cleanTitle = hideAnchor(title, anchor);
    return (
      <>
        <Anchor name={anchor} />
        <h3>{cleanTitle}</h3>
      </>
    );
  }
  return <h3>{children}</h3>;
};

const AirBnB = () => {
  return (
    <div
      className='airbnb-embed-frame'
      data-id='844912'
      data-view='experience_booking'
      data-eid='MzQxMDQ3NTI='
      data-currency='EUR'
      style={{maxWidth: '365px', margin: '0 auto'}}
    >
      <a href='https://www.airbnb.fr/experiences/844912?source=booking_widget'>Voir sur Airbnb</a>
      {
        // eslint-disable-next-line
        <a href='https://www.airbnb.fr/experiences/844912?source=booking_widget' rel='nofollow' />
      }
      <Script url='https://www.airbnb.fr/embeddable/airbnb_jssdk' />
    </div>
  );
};

const Civitatis = () => {
  return (
    <div style={{marginTop: '50px'}}>
      <iframe
        title='Civitatis'
        class='civitatis-iframe'
        src='https://www.civitatis.com/widget-activities/?affiliated=5758&display=compact&cant=2&lang=fr&currency=EUR&destination=23&category=2&width=100%height=500px'
        width='100%'
        height='500px'
        frameborder='0'
      />
    </div>
  );
};

const getAnchor = title => {
  const match = title.match(/\(\(#(.+?)\)\)/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};

const hideAnchor = (title, anchor) => title.replace(` ((#${anchor}))`, '');

export default ({data, pageContext}) => {
  const url = data.site.siteMetadata.siteUrl;
  const post = data.markdownRemark;
  const slug = post.fields.slug;
  const src = `${url}/images/${slug}/${data.markdownRemark.frontmatter.hero.name}`;
  const date = prettyDate(post.fields.date, post.fields.category);
  const title = prettyText(post.frontmatter.title);
  const featuredArticles = getFeaturedArticles(data, pageContext.category, 3);
  const instagram = data.allInstaNode.edges;

  const Gallery = ({children}) => <div className='gallery'>{children}</div>;

  const statefullTOC = ({children}) => {
    return (
      <TableOfContents>
        <p className='TOC-title'>Au sommaire :</p>
        <div dangerouslySetInnerHTML={{__html: marked(children[0])}} />
      </TableOfContents>
    );
  };

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
            <img className='post__image' alt={alt} title={title} src={`${basePath}-20w.jpeg`} />
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

  const Article = ({slug, cta = null, excerpt = null}) => {
    if (slug) {
      return <RelatedArticle slug={slug} cta={cta} excerpt={excerpt} />;
    }
    return null;
  };

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      h2: H2,
      h3: H3,
      img: optimizedImages,
      gallery: Gallery,
      toc: statefullTOC,
      article: Article,
      airbnb: AirBnB,
      civitatis: Civitatis,
    },
  }).Compiler;

  function loadLazyImages() {
    const images = Array.from(document.querySelectorAll('source, img'));
    images.forEach(img => lazyloadImage(img));
  }

  return (
    <Layout instagram={instagram}>
      <Helmet>
        <title>{post.frontmatter.title_seo ? post.frontmatter.title_seo : title}</title>
        <meta name='description' content={post.frontmatter.excerpt} />
        <meta property='og:type' content='article' />
        <meta
          property='og:title'
          content={post.frontmatter.title_seo ? post.frontmatter.title_seo : title}
        />
        <meta property='og:description' content={post.frontmatter.excerpt} />
        <meta property='og:image' content={`${src}-1600w.jpeg`} />
        <meta property='og:image:secure_url' content={`${src}-1600w.jpeg`} />
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
          <img
            className='hero__image'
            src={`${src}-400w.jpeg`}
            alt={post.fields.slug}
            onLoad={loadLazyImages}
          />
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
      <FeaturedArticles title url={url} articles={featuredArticles} fluid />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!, $category: String!, $storyblokCategory: Int!) {
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
    allStoryblokEntry(filter: {parent_id: {eq: $storyblokCategory}}) {
      edges {
        node {
          name
          created_at
          slug
          content
        }
      }
    }
    allMarkdownRemark(filter: {fields: {category: {eq: $category}, slug: {ne: $slug}}}) {
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
