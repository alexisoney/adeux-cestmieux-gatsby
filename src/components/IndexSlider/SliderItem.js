import React from 'react';
import {Link} from 'gatsby';

import Cloudinary from '../Cloudinary';

export default props => {
  const {slug, image, title} = props.post;
  let src;
  if (!image.includes('cloudinary')) {
    src = `${props.url}/images/${slug}/${image}`;
  }

  return (
    <article className={'slider__item slider__item--is-' + props.className} onClick={props.onClick}>
      <div className='slider__hero'>
        {src ? (
          <picture>
            <source
              type='image/webp'
              data-srcset={`${src}-400w.webp 400w, ${src}-800w.webp 800w, ${src}-1600w.webp 1600w, ${src}-3200w.webp 3200w`}
              sizes='70vw'
            />
            <source
              type='image/jpeg'
              data-srcset={`${src}-400w.jpeg 400w, ${src}-800w.jpeg 800w, ${src}-1600w.jpeg 1600w`}
              sizes='70vw'
            />
            <img
              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
              alt={slug}
            />
          </picture>
        ) : (
          <Cloudinary alt={slug} src={image} sizes='63vw' srcset={[400, 800, 1440, 1920, 2800]} />
        )}
      </div>
      <div className='slider__card'>
        <h1 className='slider__title'>{title}</h1>
        <Link className='button' to={`/${slug}/`}>
          Lire l'article
        </Link>
      </div>
    </article>
  );
};
