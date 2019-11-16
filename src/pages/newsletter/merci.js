import React from 'react';
import {graphql} from 'gatsby';
import Category from '../../templates/category';

const Page = ({data}) => {
  const excerpt = `Vous êtes bien inscrit(e) à la newsletter ! Clémence ne tardera pas à vous donner des nouvelles !`;

  const instagram = data.allInstaNode.edges;

  return (
    <>
      <Category
        title='Super !'
        slug='newsletter/merci'
        excerpt={excerpt}
        img=''
        instagram={instagram}
        newsletter={false}
      />
    </>
  );
};

export default Page;

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
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
`;
