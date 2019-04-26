import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import {colors, fonts, breakingpoints} from '../constant/style';
import {SocialMediasLinks} from '../constant/routes';

const Section = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  ${breakingpoints.small} {
    font-size: 22px;
  }
`;

const Link = styled.a`
  color: ${colors.alpha};
  font-size: 22px;
  text-decoration: none;
  font-family: ${fonts.beta};
  ${breakingpoints.small} {
    font-size: 16px;
  }
`;

const Images = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 1200px;
  margin: 25px auto;
  padding: 0 10px;
  justify-content: center;
  @media screen and (max-width: 599px) {
    justify-content: flex-start;
  }
`;

const Image = styled.a`
  flex: 0 1 auto;
  width: 20%;
  overflow: hidden;
  padding: 20px 10px;
  @media screen and (max-width: 850px) {
    width: 25%;
    &:last-child {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    width: 50%;
  }
`;

export default class InstagramGallery extends React.Component {
  render() {
    return (
      <Section>
        <Title>Suivez nous sur Instagram</Title>
        <Link href={SocialMediasLinks.instagram}>@{this.props.data[0].node.username}</Link>
        <Images>
          {this.props.data.map(({node}) => (
            <Image
              key={node.id}
              href={`https://www.instagram.com/p/${node.id}/`}
              title={`@${this.props.data[0].node.username}`}
            >
              <Img fluid={node.localFile.childImageSharp.fluid} />
            </Image>
          ))}
        </Images>
      </Section>
    );
  }
}
