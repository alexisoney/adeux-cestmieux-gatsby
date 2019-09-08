import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({storyblok}) => {
  if (!storyblok || !storyblok.content) return null;

  return (
    <div data-testid='container'>
      <ReactMarkdown allowedTypes={['text', 'paragraph', 'strong']} unwrapDisallowed>
        {storyblok.content}
      </ReactMarkdown>
    </div>
  );
};
