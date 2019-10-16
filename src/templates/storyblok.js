import React from 'react';

import Text from '../components/Text';

export default ({pageContext}) => {
  const title = pageContext.name;
  const {component, content, description, image} = pageContext.content;

  if (component === 'post') {
    return (
      <>
        <h1>{title}</h1>
        <p>{description}</p>
        <img src={image} alt={title} />
        {content.map(el => {
          if (el.component === 'text') {
            return <Text key={el._uid} text={el.content} />;
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
