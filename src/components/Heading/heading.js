import React from 'react';
import propTypes from 'prop-types';

const Heading = ({text, level}) => {
  if (text) {
    switch (level) {
      case 'h2':
        return <h2>{text}</h2>;
      case 'h3':
        return <h3>{text}</h3>;
      case 'h4':
        return <h4>{text}</h4>;
      default:
    }
  }
  return null;
};

Heading.propTypes = {
  text: propTypes.string,
  level: propTypes.string,
};

export default Heading;
