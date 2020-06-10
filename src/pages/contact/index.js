import React from 'react';
import {graphql} from 'gatsby';
import Category from '../../templates/category';

import ContactForm from '../../components/ContactForm';

const Page = ({data}) => {
  const excerpt = ``;

  const instagram = data.allInstaNode.edges;

  return (
    <>
      <Category
        title='Contactez nous'
        slug='contact'
        excerpt={excerpt}
        img=''
        instagram={instagram}
      >
        <ContactForm />
      </Category>
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
