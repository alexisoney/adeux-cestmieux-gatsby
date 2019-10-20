import React from 'react';
import propTypes from 'prop-types';

import Text from '../Text';

const Quote = ({content}) => {
  const output = [];

  if (Array.isArray(content)) {
    content.forEach(block => {
      if (block.component === 'text') {
        output.push(<Text key={block._uid} text={block.content} />);
      }
    });
  }

  if (output.length > 0) {
    return <blockquote>{output}</blockquote>;
  }
  return null;
};

Quote.propTypes = {
  content: propTypes.array,
};

export default Quote;
