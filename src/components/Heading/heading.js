import React from 'react';
import propTypes from 'prop-types';

const Heading = ({text, level}) => {
  let render = [];

  if (text) {
    if (level === 'h2' || level === 'h3') {
      render.push(
        <div key='anchor' name={'foo'} data-testid='heading__anchor' className='heading__anchor' />
      );
    }

    switch (level) {
      case 'h2':
        render.push(<h2 key='title'>{text}</h2>);
        break;
      case 'h3':
        render.push(<h3 key='title'>{text}</h3>);
        break;
      case 'h4':
        render.push(<h4 key='title'>{text}</h4>);
        break;
      default:
    }
  }

  return render.length > 0 ? render : null;
};

Heading.propTypes = {
  text: propTypes.string,
  level: propTypes.string,
};

export default Heading;
