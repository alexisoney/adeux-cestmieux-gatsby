import React from 'react';
import {graphql} from 'gatsby';
import Category from '../templates/category';

const Page = ({data}) => {
  const excerpt =
    'Etiam vestibulum ante purus, non luctus augue condimentum sed. In rutrum elit eget felis sodales aliquam vitae ac libero. Vestibulumporttitor, neque sed placerat auctor, neque purus porta purus, eudictum ligula nisi sit amet neque. Pellentesque habitant morbitristique senectus et netus et malesuada fames ac turpis egestas.Etiam vel nisl vitae neque tempor fermentum. Mauris eget justoaccumsan, porttitor nisi a, sagittis metus. Nam a sem posuere, sodalesenim sed, sollicitudin elit. Orci varius natoque penatibus et magnisdis parturient montes, nascetur ridiculus mus.';

  return (
    <>
      <Category title='Vivre aux Pays-Bas' excerpt={excerpt} data={data} />
    </>
  );
};

export default Page;

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {fields: {category: {eq: "vivre-aux-pays-bas"}}}
      sort: {fields: [fields___date], order: DESC}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            hero {
              name
            }
          }
        }
      }
    }
  }
`;
