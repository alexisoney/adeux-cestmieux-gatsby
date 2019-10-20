import React from 'react';
import propTypes from 'prop-types';

import {createAnchorLink, frenchNonBreakingSpaces} from '../utils';

const Heading = ({text, level, tocText}) => {
  let render = [];

  if (text) {
    if (level === 'h2' || level === 'h3') {
      render.push(
        <div
          key='anchor'
          name={createAnchorLink(tocText || text)}
          data-testid='heading__anchor'
          className='heading__anchor'
        />
      );
    }

    const formatedText = frenchNonBreakingSpaces(text);

    switch (level) {
      case 'h2':
        render.push(<h2 key='title'>{formatedText}</h2>);
        break;
      case 'h3':
        render.push(<h3 key='title'>{formatedText}</h3>);
        break;
      case 'h4':
        render.push(<h4 key='title'>{formatedText}</h4>);
        break;
      default:
    }
  }

  return render.length > 0 ? render : null;
};

Heading.propTypes = {
  level: propTypes.string,
  text: propTypes.string,
  tocText: propTypes.string,
};

export default Heading;
