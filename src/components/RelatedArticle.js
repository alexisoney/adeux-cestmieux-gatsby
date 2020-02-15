import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import {Link} from 'gatsby';
import styled from 'styled-components';
import {fonts, colors} from '../constant/style';

const Aside = styled.aside`
  background: ${colors.omega};
  display: flex;
  align-items: center;
  padding: 16px;
  margin: 24px 0;
`;

const Image = styled.div`
  flex: 1 0 auto;
  width: 33.33%;
  align-self: stretch;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1 1 auto;
  margin-left: 16px;
`;

const H1 = styled.h1`
  font-size: 20px;
  margin: 0 0 16px;
  font-family: ${fonts.alpha};
`;

const Excerpt = styled.p`
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  padding: 8px 16px !important;
  font-size: 14px !important;
`;

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                excerpt
                hero {
                  name
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const url = data.site.siteMetadata.siteUrl;
      const posts = data.allMarkdownRemark.edges;
      const postFiltered = posts.find(post => {
        return post.node.fields.slug === props.slug;
      });
      const post = postFiltered && postFiltered.node;

      if (!post) return null;

      const src = `${url}/images/${post.fields.slug}/${post.frontmatter.hero.name}`;
      return (
        <Aside>
          <Image>
            <picture>
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
              <Img className='lazyload' src={`${src}-20w.jpeg`} alt={post.fields.slug} />
            </picture>
          </Image>
          <Content>
            <H1>{post.frontmatter.title}</H1>
            {props.excerpt === '' && <Excerpt>{post.frontmatter.excerpt}</Excerpt>}
            <StyledLink className='button' to={`/${post.fields.slug}/`}>
              {props.cta ? props.cta : "Lire l'article"}
            </StyledLink>
          </Content>
        </Aside>
      );
    }}
  />
);
