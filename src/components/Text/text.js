import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({text}) => {
  if (text) {
    return (
      <ReactMarkdown
        source={text}
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
