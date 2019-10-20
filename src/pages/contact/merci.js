import React from 'react';
import {graphql} from 'gatsby';
import Category from '../../templates/category';

const Page = ({data}) => {
  const excerpt = `Votre message a bien été envoyé. Merci beaucoup d'avoir pris le temps de nous
  écrire. Nous vous répondrons le plus vite possible.`;

  const instagram = data.allInstaNode.edges;

  return (
    <>
      <Category
        title='Merci !'
        slug='contact/merci'
        excerpt={excerpt}
        img=''
        instagram={instagram}
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
