import React from 'react';
import PropTypes from 'prop-types';

import {sliceCloudinaryUrl} from './cloudinary-utils';

const Cloudinary = ({alt, sizes: customSizes, srcset: customSrcSet, url}) => {
  if (typeof url === 'undefined') {
    return null;
  }

  if (!url.includes('https://res.cloudinary.com/')) {
    return null;
  }

  const slicedUrl = sliceCloudinaryUrl(url);
  const sizes = customSizes || '(max-width: 770px) 100vw, 630px';

  const extensionIndex = url.lastIndexOf('.') + 1;
  const extension = url.slice(extensionIndex);
  const extensionSearchRegex = new RegExp(extension, 'g');

  let defaultSrc = `${slicedUrl[0]}/w_630,q_auto/${slicedUrl[1]}`;
  let lowResolutionSrc = `${slicedUrl[0]}/w_10,q_30,e_blur/${slicedUrl[1]}`;
  if (extension !== 'jpg') {
    defaultSrc = defaultSrc.replace(extensionSearchRegex, 'jpg');
    lowResolutionSrc = lowResolutionSrc.replace(extensionSearchRegex, 'jpg');
  }

  let srcSetList = [];
  if (customSrcSet) {
    customSrcSet.forEach(size => {
      srcSetList.push(`${slicedUrl[0]}/w_${size},q_auto/${slicedUrl[1]} ${size}w`);
    });
  } else {
    srcSetList = [
      `${slicedUrl[0]}/w_400,q_auto/${slicedUrl[1]} 400w`,
      `${slicedUrl[0]}/w_800,q_auto/${slicedUrl[1]} 800w`,
      `${slicedUrl[0]}/w_1300,q_auto/${slicedUrl[1]} 1300w`,
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
  url: PropTypes.string,
};

export default Cloudinary;
