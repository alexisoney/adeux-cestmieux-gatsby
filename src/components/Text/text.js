import React from 'react';
import ReactMarkdown from 'react-markdown';

import {frenchNonBreakingSpaces} from '../utils';

export default ({text}) => {
  if (text) {
    return (
      <ReactMarkdown
        source={frenchNonBreakingSpaces(text)}
        allowedTypes={[
          'break',
          'emphasis',
          'list',
          'link',
          'listItem',
          'paragraph',
          'strong',
          'text',
        ]}
      />
    );
  }

  return null;
};
