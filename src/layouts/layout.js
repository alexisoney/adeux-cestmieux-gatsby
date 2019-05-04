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

class Layout extends React.Component {
  render() {
    return (
      <Page>
        <Helmet htmlAttributes={{lang: 'fr'}}>
          <html lang='fr' />
          <title>{siteMetadata.title}</title>
          <meta name='description' content={siteMetadata.description} />
          <meta property='og:title' content={siteMetadata.title} />
          <meta property='og:description' content={siteMetadata.description} />
          <meta
            property='og:image'
            content='https://develop--adeux-cestmieux.netlify.com/images/visiter-amsterdam-printemps-2019/IMG_6502-1600w.jpeg'
          />
          <meta property='og:url' content='https://adeux-cestmieux.com' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta property='og:site_name' content={siteMetadata.title} />
          <meta name='twitter:image:alt' content={siteMetadata.title} />
        </Helmet>
        <Header />
        <Content>{this.props.children}</Content>
        <InstagramGallery data={this.props.data.allInstaNode.edges} />
        <Footer>© {siteMetadata.title}</Footer>
      </Page>
    );
  }
}

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
                    ...GatsbyImageSharpFluid_withWebp_noBase64
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
