import React from 'react';
import {Helmet} from 'react-helmet';
import Layout from '../layouts/layout';
import FeaturedArticles from './../components/FeaturedArticles';
import styled from 'styled-components';
import {breakingpoints} from '../constant/style';
import siteMetadata from '../constant/siteMetadata';

const Title = styled.h1`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  ${breakingpoints.small} {
    font-size: 52px;
  }
  @media screen and (max-width: 820px) {
    margin-left: 25px;
    margin-right: 25px;
  }
`;

const Excerpt = styled.p`
  box-sizing: border-box;
  margin: 0 auto 60px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  max-width: 770px;
  align-self: center;
  @media screen and (max-width: 820px) {
    margin-left: 25px;
    margin-right: 25px;
  }
`;

const Category = ({title, excerpt, img, slug, articles, siteUrl}) => {
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={excerpt} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={excerpt} />
        {img && <meta property='og:image' content={img} />}
        {img && <meta property='og:image:secure_url' content={img} />}
        <meta property='og:url' content={`${siteUrl}/${slug}/`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={siteMetadata.title} />
        <meta name='twitter:image:alt' content={slug} />
      </Helmet>
      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
      <FeaturedArticles articles={articles} />
    </Layout>
  );
};

export default Category;
