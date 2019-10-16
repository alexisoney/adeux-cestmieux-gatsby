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
          {this.props.articles &&
            this.props.articles.map(({key, category, date, title, slug, image}) => {
              return (
                <Item key={key} fluid={this.props.fluid}>
                  <HeroContainer>
                    {image.includes('cloudinary') ? (
                      <Hero>
                        <img className='lazyload' src={image} alt={slug} />
                      </Hero>
                    ) : (
                      <Hero>
                        <source
                          type='image/webp'
                          data-srcSet={`${image}-400w.webp 400w, ${image}-800w.webp 800w, ${image}-1600w.webp 1600w`}
                          sizes='(max-width: 900px) 100vw, 33vw'
                        />
                        <source
                          type='image/jpeg'
                          data-srcSet={`${image}-400w.jpeg 400w, ${image}-800w.jpeg 800w, ${image}-1600w.jpeg 1600w`}
                          sizes='(max-width: 900px) 100vw, 33vw'
                        />
                        <img className='lazyload' src={`${image}-20w.jpeg`} alt={slug} />
                      </Hero>
                    )}
                  </HeroContainer>
                  <Card>
                    {category === 'blog' && <CardDate>{prettyDate(date, category)}</CardDate>}
                    <CardTitle dangerouslySetInnerHTML={{__html: prettyText(title)}} />
                    <Button className='button' to={`/${slug}/`}>
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
