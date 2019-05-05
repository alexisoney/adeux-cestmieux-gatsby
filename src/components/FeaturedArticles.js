import React from 'react';
import styled from 'styled-components';
import {colors, breakingpoints} from './../constant/style';
import {Link} from 'gatsby';
import prettyDate from '../utils/prettyDate';
import prettyText from '../utils/prettyText';

const Section = styled.section`
  background: ${colors.omega};
`;

const Title = styled.h1`
  color: ${colors.gamma};
  text-align: center;
  font-size: 48px;
  ${breakingpoints.small} {
    font-size: 32px;
  }
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  ${breakingpoints.small} {
    margin: 0;
    padding: 0 25px;
  }
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

const Hero = styled.picture`
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
  padding: 20px 20px;
  width: 90%;
  margin: 0;
  flex: 1 0 auto;
  display: flex;
  flex-flow: column nowrap;
  /* justify-content: space-between; */
  align-items: flex-start;
`;

const CardTitle = styled.h2`
  width: 100%;
  font-size: 24px;
  margin: 0 0 20px;
`;

const CardDate = styled.p`
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 12px;
  margin: 0;
`;

const Button = styled(Link)`
  margin-top: auto;
`;

export default class FeaturedArticles extends React.Component {
  render() {
    return (
      <Section>
        {this.props.title && <Title>Vous aimerez aussi</Title>}
        <Container>
          {this.props.posts.map(({node}) => {
            const src = `${this.props.url}/images/${node.fields.slug}/${
              node.frontmatter.hero.name
            }`;
            return (
              <Item key={node.id} fluid={this.props.fluid}>
                <HeroContainer>
                  <Hero>
                    <source
                      type='image/webp'
                      data-srcset={`${src}-400w.webp 400w, ${src}-800w.webp 800w, ${src}-1600w.webp 1600w`}
                      sizes='(max-width: 900px) 100vw, 33vw'
                    />
                    <source
                      type='image/jpeg'
                      data-srcset={`${src}-400w.jpeg 400w, ${src}-800w.jpeg 800w, ${src}-1600w.jpeg 1600w`}
                      sizes='(max-width: 900px) 100vw, 33vw'
                    />
                    <img className='lazyload' src={`${src}-20w.jpeg`} alt={node.fields.slug} />
                  </Hero>
                </HeroContainer>
                <Card>
                  {node.fields.category === 'blog' && (
                    <CardDate>{prettyDate(node.fields.date, node.fields.category)}</CardDate>
                  )}
                  <CardTitle
                    dangerouslySetInnerHTML={{__html: prettyText(node.frontmatter.title)}}
                  />
                  <Button className='button' to={`/${node.fields.slug}/`}>
                    Lire l'article
                  </Button>
                </Card>
              </Item>
            );
          })}
        </Container>
      </Section>
    );
  }
}
