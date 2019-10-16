import React from 'react';
import propTypes from 'prop-types';

import Cloudinary from '../Cloudinary';

const Gallery = ({images}) => {
  if (Array.isArray(images) && images.length > 0) {
    return (
      <div className='gallery'>
        {images.map((image, index) => {
          const {_uid, src, alt} = image;
          let sizes = '(max-width: 770px) 50vw, 315px';
          let srcset = [200, 400, 650];

          if (index + 1 === images.length && (index + 1) % 3 === 0) {
            sizes = undefined;
            srcset = undefined;
          }

          return (
            <div key={_uid} className='gallery__item'>
              <Cloudinary src={src} alt={alt} sizes={sizes} srcset={srcset} />
            </div>
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
