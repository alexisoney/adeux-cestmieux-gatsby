import React from 'react';
import propTypes from 'prop-types';
import SbEditable from 'storyblok-react';

import Cloudinary from '../Cloudinary';

const Gallery = ({images}) => {
  if (Array.isArray(images) && images.length > 0) {
    return (
      <div className='gallery'>
        {images.map(image => {
          const {_uid, src, alt} = image;
          return (
            <SbEditable key={_uid} content={image}>
              <div className='gallery__item'>
                <Cloudinary url={src} alt={alt} />
              </div>
            </SbEditable>
          );
        })}
      </div>
    );
  }
  return null;
};

Gallery.propTypes = {
  images: propTypes.array,
};

export default Gallery;
