import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({storyblok}) => {
  if (storyblok && storyblok.content) {
    return (
      <ReactMarkdown
        source={storyblok.content}
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
