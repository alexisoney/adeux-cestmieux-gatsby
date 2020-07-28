import React, { useEffect, createRef } from 'react';
import propTypes from 'prop-types';

import { sliceCloudinarySrc } from './cloudinary-utils';

const Cloudinary = ({
  alt,
  lazyload = true,
  onload,
  sizes: customSizes,
  srcset: customSrcSet,
  src,
  wide,
}) => {
  const wrapper = createRef();
  useEffect(() => {
    if (wrapper && wrapper.current && lazyload) {
      const tags = wrapper.current.querySelectorAll('source, img');

      if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              lazyloadImage(entry.target);
              lazyImageObserver.unobserve(entry.target);
            }
          });
        });

        tags.forEach(tag => lazyImageObserver.observe(tag));
      } else {
        tags.forEach(tag => {
          lazyloadImage(tag);
        });
      }
    }
  });

  if (typeof src === 'undefined') {
    return null;
  }

  if (!src.includes('https://res.cloudinary.com/')) {
    return null;
  }

  if (wide === true) {
    customSizes = '(max-width: 1060px) 100vw, 1060px';
    customSrcSet = [400, 800, 1060, 2120];
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

  const wrapperClasses = ['cloudinary', wide ? 'cloudinary--is-wide' : null]
    .filter(v => !!v)
    .join(' ');

  return (
    <div ref={wrapper} data-testid='cloudinary' className={wrapperClasses}>
      <picture>
        <source
          type='image/webp'
          sizes={sizes}
          data-srcset={wepbSrcSet}
          srcSet={lazyload ? null : wepbSrcSet}
        />
        <img
          className='cloudinary__image'
          alt={alt}
          src={lazyload ? lowResolutionSrc : defaultSrc}
          srcSet={lazyload ? null : jpgSrcSet}
          sizes={sizes}
          data-src={defaultSrc}
          data-srcset={jpgSrcSet}
          onLoad={onload}
        />
      </picture>
    </div>
  );
};

Cloudinary.propTypes = {
  alt: propTypes.string,
  lazyload: propTypes.bool,
  onload: propTypes.func,
  sizes: propTypes.string,
  srcset: propTypes.array,
  src: propTypes.string,
  wide: propTypes.bool,
};

export default Cloudinary;
