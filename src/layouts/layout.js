import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import {Helmet} from 'react-helmet';
import Header from '../components/Header/index';
import InstagramGallery from '../components/InstagramGallery';
import siteMetadata from '../constant/siteMetadata';
import '../scss/style.scss';
import styled from 'styled-components';
import {colors, fonts} from './../constant/style';

const Page = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Content = styled.section`
  flex: 1 1 auto;
  margin-top: 80px;
  display: flex;
  flex-flow: column nowrap;
`;

const Footer = styled.p`
  flex: 0 0 auto;
  margin: 0;
  padding: 24px 0;
  text-align: center;
  font-family: ${fonts.beta};
  background-color: ${colors.omega};
  color: ${colors.text};
  font-size: 12px;
`;

const Layout = ({data, children}) => {
  return (
    <Page>
      <Helmet htmlAttributes={{lang: 'fr'}}>
        <title>{siteMetadata.title}</title>
        <meta name='description' content={siteMetadata.description} />
        <html lang='fr' />
      </Helmet>
      <Header />
      <Content>{children}</Content>
      <InstagramGallery data={data.allInstaNode.edges} />
      <Footer>© {siteMetadata.title}</Footer>
    </Page>
  );
};




export default props => (
  <StaticQuery
    query={graphql`
      query {
        allInstaNode(sort: {fields: timestamp, order: DESC}, limit: 5) {
          edges {
            node {
              id
              likes
              username
              localFile {
                childImageSharp {
                  fluid(maxWidth: 220, maxHeight: 220) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
);
