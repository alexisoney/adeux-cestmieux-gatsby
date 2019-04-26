import React from 'react';
import Layout from '../layouts/layout';
import FeaturedArticles from './../components/FeaturedArticles';
import styled from 'styled-components';
import {breakingpoints} from '../constant/style';

const Title = styled.h1`
  text-align: center;
  margin-left: 14px;
  margin-right: 14px;
  ${breakingpoints.small} {
    font-size: 52px;
  }
`;

const Excerpt = styled.p`
  box-sizing: border-box;
  margin: 0 auto 60px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  max-width: 640px;
  align-self: center;
`;

const Category = ({title, excerpt, data}) => {
  return (
    <Layout>
      <Title>{title}</Title>
      <Excerpt>{excerpt}</Excerpt>
      <FeaturedArticles posts={data.allMarkdownRemark.edges} />
    </Layout>
  );
};

export default Category;
