import React from 'react';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import {colors, fonts} from '../constant/style';
import ContactForm from '../components/ContactForm';
// import Layout from '../layouts/layout';
// import FeaturedArticles from '../components/FeaturedArticles';
// import RelatedArticle from '../components/RelatedArticle';
// import prettyText from '../utils/prettyText';
// import prettyDate from '../utils/prettyDate';
// import rehypeReact from 'rehype-react';
// import path from 'path';
// import marked from 'marked';
// import Script from 'react-load-script';

const breakingPoint = '@media screen and (max-width: 800px)';

const SEO = {
  url: 'https://adeux-cestmieux.com/visiter-amsterdam-en-francais/',
  title: 'Visiter Amsterdam en Français',
  excerpt: "Une visite guidée d'Amsterdam centre, en Français !",
  img: '',
  CTA: 'Réserver maintenant !',
};

const SiteTitle = styled.h1`
  text-align: center;
  color: ${colors.alpha};
  font-size: 20px;
  font-family: ${fonts.beta};
  margin: 24px 0;
`;

const Section = styled.section`
  max-width: 1060px;
  margin: 0 auto;
  font-family: ${fonts.alpha};
  font-size: 16px;
  overflow-x: hidden;
  b {
    font-weight: 700;
    color: ${colors.alpha};
  }
  p {
    line-height: 32px;
  }
  h2 {
    margin: 10px 0;
    line-height: 40px;
  }
  ${breakingPoint} {
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  ${breakingPoint} {
    flex-flow: column nowrap;
    justify-content: center;
  }
`;

const Icon = styled.img`
  width: 24px;
  margin-right: 20px;
  ${breakingPoint} {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const Header = styled.header`
  background: #f7f7f7;
  position: relative;
`;

const HeaderImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderContent = styled.div`
  position: relative;
  padding: 184px 24px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const HeaderTitle = styled.h1`
  font-size: 56px;
  line-height: 64px;
  font-family: ${fonts.beta};
  color: white;
  margin: 0 auto 40px;
  max-width: 550px;
  text-align: center;
`;

const HeaderCTA = styled.div`
  text-align: center;
  ${breakingPoint} {
    max-width: 240px;
    margin: 0 auto;
  }
`;

const Button = styled.div`
  display: inline-block;
  text-transform: uppercase;
  font-size: 14px;
  width: 240px;
  padding: 16px;
  margin: 10px;
  border: 1px solid ${colors.alpha};
  background: white;
  color: ${colors.alpha};
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const CTA = styled(Button)`
  background: ${colors.alpha};
  color: white;
`;

const CTASubtitle = styled.div`
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
`;

const InAGlance = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  height: 100px;
  padding: 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  margin-top: -50px;
  box-shadow: 0 10px 30px 0 #ebebeb;
`;

const CenteredBox = styled.div`
  max-width: 60%;
  margin: 100px auto;
  text-align: justify;
  ${CTA} {
    display: block;
    margin: 60px auto 10px;
  }
`;

const SubHeading = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 18px;
  margin: 0;
`;

const Schedule = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-top: 220px;
  margin-bottom: 200px;
  ${breakingPoint} {
    flex-wrap: wrap;
    margin-bottom: 100px;
  }
`;

const ScheduleImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const ScheduleList = styled.div`
  position: relative;
  width: 50%;
  padding: 0;
  margin-bottom: 100px;
  ${breakingPoint} {
    width: 100%;
    order: 2;
    margin-bottom: 0;
  }
`;

const ScheduleListItems = styled.ul`
  width: 66%;
  margin: 0 auto;
  background: ${colors.omega};
  padding: 40px;
  color: ${colors.alpha};
`;

const ScheduleListItem = styled.li`
  margin: 0;
  margin-left: 20px;
  font-size: 24px;
  font-family: ${fonts.beta};
  font-weight: 300;
`;

const ScheduleListItemMore = styled(ScheduleListItem)`
  color: ${colors.beta};
  list-style: none;
`;

const ScheduleDetails = styled.div`
  position: relative;
  background: white;
  width: 50%;
  padding: 40px;
  box-shadow: 0 -60px 80px 0 rgba(0, 0, 0, 0.1);
  ${breakingPoint} {
    width: 100%;
    margin: -50px 20px 0;
    order: 1;
  }
`;

const Details = styled.div`
  display: flex;
  position: relative;
  padding: 80px 0 180px;
  margin-bottom: 200px;
`;

const DetailsBackground = styled.img`
  position: absolute;
  top: 0;
  left: -20%;
  height: 100%;
  width: calc(((100vw - 1060px) / 2) + (1060px * 0.3));
  ${breakingPoint} {
    display: none;
  }
`;

const DetailsImageWrapper = styled.div`
  position: relative;
  width: 50%;
`;

const DetailsImageContainer = styled.div`
  position: relative;
  width: 66%;
  height: 100%;
  margin: 0 auto;
  background: grey;
`;

const DetailsImg = styled.img``;

const DetailsImageCard = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  background: ${colors.gamma};
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-size: 10px;
  width: 110px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 0;
  }
`;
const DetailsImageCardPrice = styled.p`
  font-weight: bold;
  font-size: 40px;
  font-family: ${fonts.beta};
`;

const DetailsContent = styled.div`
  position: relative;
  width: 50%;
  ${CTA} {
    margin: 50px 0 0;
  }
`;

const DetailsItems = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DetailsItem = styled.div`
  margin: 10px 0;
`;

const DetailsItemTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.5px;
  line-height: 18px;
  text-transform: uppercase;
  font-family: ${fonts.alpha};
  color: ${colors.text};
  margin: 0;
`;

const DetailsItemText = styled.p`
  margin: 0;
  line-height: 32px;
`;

const Team = styled.div`
  display: flex;
  margin-bottom: 200px;
  ${breakingPoint} {
    flex-wrap: wrap;
  }
`;

const TeamContent = styled.div`
  width: 40%;
  padding-bottom: 40px;
  ${breakingPoint} {
    width: 100%;
    order: 2;
  }
`;

const TeamLogo = styled.img`
  margin: 24px 0 36px;
`;

const TeamPictures = styled.div`
  position: relative;
  width: 60%;
  padding-top: 50%;
  overflow: hidden;
  ${breakingPoint} {
    width: 100%;
    order: 1;
  }
`;

const TeamPictureTop = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  width: 70%;
`;

const TeamPictureBottom = styled.img`
  position: absolute;
  left: 40px;
  bottom: 0;
  width: 48%;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5), 40px -40px 80px 0 rgba(0, 0, 0, 0.1);
`;

const Testimonials = styled.div`
  width: 100vw;
  background: ${colors.omega};
  margin-left: calc(-1 * ((100vw - 1060px) / 2));
  padding: 100px calc((100vw - 1060px) / 2);
  margin-bottom: 100px;
  ${CTA} {
    display: block;
    margin: 60px auto 10px;
  }
  ${breakingPoint} {
    margin-left: 0;
  }
`;

const TestimonialsContainer = styled.div`
  max-width: 1060px;
`;

const TestimonialsIcon = styled.img`
  margin: 0 auto 24px;
  width: 32px;
`;

const TestimonialsTitle = styled.h2`
  color: ${colors.alpha};
  text-align: center;
`;

const TestimonialsReview = styled.div`
  display: flex;
  margin-top: 40px;
`;

const ScoreReview = styled.div`
  flex: 0 0 auto;
  margin: auto 0;
  display: flex;
  flex-flow: column nowrap;
`;

const ScoreBox = styled.div`
  font-family: ${fonts.beta};
  color: ${colors.beta};
  font-size: 56px;
  font-weight: bold;
  line-height: 64px;
  text-align: center;
  background: white;
  padding: 36px;
  p {
    margin: 0 0 48px;
  }
  img {
    margin: 0 0 16px;
    width: 200px;
  }
`;

const ScoreSource = styled.p`
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 13px;
  text-align: center;
  margin: 20px 0 0;
`;

const TextReview = styled.div`
  margin: auto 0;
  color: ${colors.beta};
  font-family: ${fonts.beta};
  font-size: 24px;
  line-height: 30px;
  padding: 0 0 40px 80px;
  p {
    margin: 0 0 20px;
  }
`;
const AuthorReview = styled.div`
  font-family: ${fonts.alpha};
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 18px;
  text-transform: uppercase;
  margin: 0%;
`;

const Contact = styled.div`
  & h2 {
    margin: 0 auto 40px;
  }
`;

const ContactTitle = styled.h2`
  font-size: 20px;
  color: ${colors.alpha};
  text-align: center;
`;

const Footer = styled.p`
  width: 100vw;
  background: ${colors.omega};
  margin: 0;
  margin-left: calc(-1 * ((100vw - 1060px) / 2));
  text-align: center;
  font-size: 12px;
  font-family: ${fonts.beta};
  padding: 32px 0;
  ${breakingPoint} {
    margin-left: 0;
  }
`;

export default () => (
  <>
    <Helmet>
      <title>{SEO.title}</title>
      <meta name='description' content={SEO.excerpt} />
      <meta property='og:type' content='article' />
      <meta property='og:title' content={SEO.title} />
      <meta property='og:description' content={SEO.excerpt} />
      <meta property='og:image' content={SEO.img} />
      <meta property='og:image:secure_url' content={SEO.img} />
      <meta property='og:url' content={SEO.url} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta property='og:site_name' content={SEO.title} />
      <meta name='twitter:image:alt' content={SEO.title} />
    </Helmet>
    <Section>
      <SiteTitle>À deux c'est mieux</SiteTitle>
      <Header>
        <picture>
          <source
            type='image/jpeg'
            data-srcset='./visiter-amsterdam-en-francais-900.jpg 900w,./visiter-amsterdam-en-francais-1600.jpg 1600w,./visiter-amsterdam-en-francais-2160.jpg 2160w'
            sizes='(max-width: 1600px) 100vw, 1600px'
          />
          <HeaderImg
            className='lazyload'
            alt='Visiter Amsterdam en français'
            data-src={'./visiter-amsterdam-en-francais-900.jpg'}
          />
        </picture>
        <HeaderContent>
          <HeaderTitle>{SEO.title}</HeaderTitle>
          <HeaderCTA>
            <CTA>{SEO.CTA}</CTA>
            <Button>En savoir plus</Button>
          </HeaderCTA>
        </HeaderContent>
      </Header>
      <InAGlance>
        <IconContainer>
          <Icon src='./icon_location.svg' /> Amsterdam Centre
        </IconContainer>
        <IconContainer>
          <Icon src='./icon_flag_france.svg' /> En Français
        </IconContainer>
        <IconContainer>
          <Icon src='./icon_time.svg' /> 1,5 heures
        </IconContainer>
      </InAGlance>
      <CenteredBox>
        <h2>Bienvenue à Amsterdam !</h2>
        <p>Vous avez prévu de visiter Amsterdam très prochainement ?</p>
        <p>
          Ses canaux, ses vélos, ses maisons, son patrimoine artistique et bien d’autre encore…
          Découvrir Amsterdam est un vaste programme.
        </p>
        <p>
          Alexis et Clémence ont le plaisir de vous proposer leur{' '}
          <b>visites guidées d’Amsterdam en français</b> afin de vous faire découvrir les plus beaux
          endroits de la ville mais aussi son histoire si riche !
        </p>
        <CTA>{SEO.CTA}</CTA>
        <CTASubtitle>17€ par personne</CTASubtitle>
      </CenteredBox>
      <Schedule>
        <picture>
          <source
            type='image/jpeg'
            data-srcset='./programme-visite-amsterdam-900.jpg 900w, ./programme-visite-amsterdam-1600.jpg 1600w, ./programme-visite-amsterdam-3180.jpg 3180w, '
            sizes='(max-width: 1600px) 100vw, 1600px'
          />
          <ScheduleImg
            className='lazyload'
            data-src='./programme-visite-amsterdam-3180.jpg'
            alt=''
          />
        </picture>
        <ScheduleList>
          <ScheduleListItems>
            <ScheduleListItem>La place du Dam</ScheduleListItem>
            <ScheduleListItem>La vieille ville</ScheduleListItem>
            <ScheduleListItem>Les canaux</ScheduleListItem>
            <ScheduleListItem>Le quartier rouge</ScheduleListItem>
            <ScheduleListItemMore>Et bien plus encore …</ScheduleListItemMore>
          </ScheduleListItems>
        </ScheduleList>
        <ScheduleDetails>
          <SubHeading>Au programme</SubHeading>
          <h2>Une visite intimiste du centre historique</h2>
          <p>
            <b>
              Nous nous retrouverons en plein coeur de la ville pour une découverte d’Amsterdam.
            </b>
          </p>
          <p>
            Ensemble, nous explorerons la ville, son histoire incroyable et sa culture si riche,
            tout en prenant le temps d’admirer son architecture unique !
          </p>
          <p>
            Nous vous raconterons le destin incroyable d’Amsterdam, alors petit village de pêcheurs
            devenu en peu de temps l’une des villes les plus puissantes du monde.
          </p>
          <p>
            Au fil des ruelles et canaux, nous vous partagerons de nombreuses anecdotes qui feront
            de vous le roi des discussions dans vos prochains dîners !
          </p>
        </ScheduleDetails>
      </Schedule>
      <Details>
        <picture>
          <source
            type='image/jpeg'
            srcSet='./infos-pour-visiter-amsterdam-450.jpg 450w, ./infos-pour-visiter-amsterdam-900.jpg 900w, ./infos-pour-visiter-amsterdam-1482.jpg 1482w'
            sizes='(max-width: 1600px) 25vw, 1200px'
          />
          <DetailsBackground src='./infos-pour-visiter-amsterdam-900.jpg' alt='' />
        </picture>
        <DetailsImageWrapper>
          <DetailsImageContainer>
            <picture>
              <source
                type='image/jpeg'
                srcSet='./conseils-pour-visiter-amsterdam-450.jpg 450w, ./conseils-pour-visiter-amsterdam-960.jpg 960w'
                sizes='(max-width: 700px) 100vw, 700px'
              />
              <DetailsImg src='./conseils-pour-visiter-amsterdam-960.jpg' alt='' />
            </picture>
            <DetailsImageCard>
              <DetailsImageCardPrice>17€</DetailsImageCardPrice>
              <p>par pers.</p>
            </DetailsImageCard>
          </DetailsImageContainer>
        </DetailsImageWrapper>
        <DetailsContent>
          <SubHeading>Informations utiles</SubHeading>
          <h2>Départ de la visite guidée</h2>
          <p>
            Nous partons pour une heure et demi de marche (avec pauses). Prévoyez donc une paire de
            chaussure comfortables pour marcher.
          </p>
          <DetailsItems>
            <DetailsItem>
              <Icon src='./icon_clock.svg' />
            </DetailsItem>
            <DetailsItem>
              <DetailsItemTitle>Départ :</DetailsItemTitle>
              <DetailsItemText>9h – Place du Dam</DetailsItemText>
            </DetailsItem>
          </DetailsItems>
          <DetailsItems>
            <DetailsItem>
              <Icon src='./icon_calendar.svg' />
            </DetailsItem>
            <DetailsItem>
              <DetailsItemTitle>Prochaine visite :</DetailsItemTitle>
              <DetailsItemText>Lundi 10 juin</DetailsItemText>
            </DetailsItem>
          </DetailsItems>
          <CTA>{SEO.CTA}</CTA>
        </DetailsContent>
      </Details>
      <Team>
        <TeamContent>
          <SubHeading>Vos guides locaux</SubHeading>
          <TeamLogo src='./Alexis-Clemence.svg' alt='Alexis et Clémence' />
          <p>
            Nous sommes Alexis et Clémence, deux expat français vivant à Amsterdam depuis 2016 et
            auteurs du blog <b>adeux-cestmieux.com</b>. Nous avons décidé de poser nos valises à
            Amsterdam après une visite coup-de-coeur le temps d’un week-end.
          </p>
          <p>
            À travers cette visite, nous vous partagerons notre passion pour cette ville en vous
            guidant, à notre manière, à travers ses canaux et ruelles.
          </p>
        </TeamContent>
        <TeamPictures>
          <TeamPictureTop
            src='./alexis-guide-francais-amsterdam-1500.jpg'
            alt='Alexis, guide à Amsterdam'
          />
          <TeamPictureBottom
            src='./clemence-guide-francais-amsterdam-900.jpg'
            alt='Clémence, guide à Amsterdam'
          />
        </TeamPictures>
      </Team>
      <Testimonials>
        <TestimonialsContainer>
          <TestimonialsIcon src='./icon_heart.svg' />
          <TestimonialsTitle>Ils ont visité, ils ont aimé !</TestimonialsTitle>
          <TestimonialsReview>
            <ScoreReview>
              <ScoreBox>
                <p>5/5</p>
                <Icon src='./icon_5_star.svg' />
              </ScoreBox>
              <ScoreSource>Sur Airbnb.fr</ScoreSource>
            </ScoreReview>
            <TextReview>
              <p>
                “ Très enrichissant et intéressant pour connaître l'histoire de la ville. Clémence
                et Alexis sont très sympas et disponibles. À recommander ! ”{' '}
              </p>
              <AuthorReview>Gislaine · Mai, 2019</AuthorReview>
            </TextReview>
          </TestimonialsReview>
          <CTA>{SEO.CTA}</CTA>
          <CTASubtitle>17€ par personne</CTASubtitle>
        </TestimonialsContainer>
      </Testimonials>
      <Contact>
        <ContactTitle>Une question ?</ContactTitle>
        <ContactForm />
      </Contact>
      <Footer>© À deux c'est mieux</Footer>
      <main />
    </Section>
  </>
);
