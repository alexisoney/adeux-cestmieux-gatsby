import React from 'react';
import PropTypes from 'prop-types';

import {sliceCloudinarySrc} from './cloudinary-utils';

const Cloudinary = ({alt, sizes: customSizes, srcset: customSrcSet, src}) => {
  if (typeof src === 'undefined') {
    return null;
  }

  if (!src.includes('https://res.cloudinary.com/')) {
    return null;
  }

  const slicedSrc = sliceCloudinarySrc(src);
  const sizes = customSizes || '(max-width: 770px) 100vw, 630px';

  const extensionIndex = src.lastIndexOf('.') + 1;
  const extension = src.slice(extensionIndex);
  const extensionSearchRegex = new RegExp(extension, 'g');

  let defaultSrc = `${slicedSrc[0]}/w_630,q_auto/${slicedSrc[1]}`;
  let lowResolutionSrc = `${slicedSrc[0]}/w_10,q_30,e_blur/${slicedSrc[1]}`;
  if (extension !== 'jpg') {
    defaultSrc = defaultSrc.replace(extensionSearchRegex, 'jpg');
    lowResolutionSrc = lowResolutionSrc.replace(extensionSearchRegex, 'jpg');
  }

  let srcSetList = [];
  if (customSrcSet) {
    customSrcSet.forEach(size => {
      srcSetList.push(`${slicedSrc[0]}/w_${size},q_auto/${slicedSrc[1]} ${size}w`);
    });
  } else {
    srcSetList = [
      `${slicedSrc[0]}/w_400,q_auto/${slicedSrc[1]} 400w`,
      `${slicedSrc[0]}/w_800,q_auto/${slicedSrc[1]} 800w`,
      `${slicedSrc[0]}/w_1300,q_auto/${slicedSrc[1]} 1300w`,
    ];
  }
  const srcSet = srcSetList.join(',');
  const jpgSrcSet = extension === 'jpg' ? srcSet : srcSet.replace(extensionSearchRegex, 'jpg');
  const wepbSrcSet = srcSet.replace(extensionSearchRegex, 'webp');

  return (
    <div className='cloudinary'>
      <picture>
        <source type='image/webp' sizes={sizes} data-srcset={wepbSrcSet} />
        <img
          className='lazyload'
          alt={alt}
          src={lowResolutionSrc}
          sizes={sizes}
          data-src={defaultSrc}
          data-srcset={jpgSrcSet}
        />
      </picture>
    </div>
  );
};

Cloudinary.propTypes = {
  alt: PropTypes.string,
  sizes: PropTypes.string,
  srcset: PropTypes.array,
  src: PropTypes.string,
};

export default Cloudinary;
