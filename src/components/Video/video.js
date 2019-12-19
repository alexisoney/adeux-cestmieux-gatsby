import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ src }) => {
  if (typeof src !== 'string' || src.length === 0) {
    return null;
  }

  return (
    <div data-testid='video' className='video'>
      <iframe
        data-testid='video__iframe'
        className='video__iframe'
        title='video-player'
        src={src}
        frameBorder='0'
        allowFullScreen
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      ></iframe>
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.string,
};

export default Video;
