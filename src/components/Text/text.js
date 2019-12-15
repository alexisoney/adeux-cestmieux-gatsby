import React from 'react';
import ReactMarkdown from 'react-markdown';

import {frenchNonBreakingSpaces, createLink} from '../utils';

export default ({text, quote}) => {
  if (text) {
    const render = (
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
        renderers={{
          link: ({href, children}) => createLink(href, children[0].props.children),
        }}
      />
    );

    if (quote) {
      return <blockquote>{render}</blockquote>;
    }

    return render;
  }

  return null;
};
