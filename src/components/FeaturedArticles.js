import React from 'react';
import styled from 'styled-components';
import {colors} from './../constant/style';
import {Link} from 'gatsby';

const Section = styled.section`
  background: ${colors.omega};
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const Item = styled.div`
  flex: 0 1 auto;
  flex-grow: ${props => (props.fluid ? '1' : '0')};
  width: 33.33%;
  padding: 20px 10px;
  display: flex;
  flex-flow: column nowrap;
  @media screen and (max-width: 900px) {
    width: 50%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  margin: 0 0 -15%;
  flex: 0 1 auto;
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.6);
`;

const Hero = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`;

const Card = styled.div`
  position: relative;
  background: white;
  padding: 20px 20px 40px;
  width: 90%;
  margin: 0;
  flex: 1 0 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardTitle = styled.h2`
  width: 100%;
  font-size: 24px;
  margin: 0 0 20px;
`;

export default class FeaturedArticles extends React.Component {
  render() {
    return (
      <Section>
        <Container>
          {this.props.posts.map(({node}) => {
            const hero = `${node.frontmatter.hero.publicURL}?nf_resize=fit&w=`;
            return (
              <Item key={node.id} fluid={this.props.fluid}>
                <HeroContainer>
                  <Hero
                    data-srcset={`${hero}400 400w, ${hero}800 800w, ${hero}1600 1600w`}
                    sizes='(max-width: 900px) 100vw, 33vw'
                    src={`${hero}20`}
                    alt={node.fields.slug}
                    className='lazyload'
                  />
                </HeroContainer>
                <Card>
                  <CardTitle>{node.frontmatter.title}</CardTitle>
                  <Link className='button' to={`/${node.fields.slug}`}>
                    Lire l'article
                  </Link>
                </Card>
              </Item>
            );
          })}
        </Container>
      </Section>
    );
  }
}
