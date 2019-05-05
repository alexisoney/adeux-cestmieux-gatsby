import React from 'react';
import {Link} from 'gatsby';

export default props => {
  const data = props.data;
  const src = `${props.url}/images/${data.fields.slug}/${data.frontmatter.hero.name}`;

  return (
    <article className={'slider__item slider__item--is-' + props.className} onClick={props.onClick}>
      <div className='slider__hero'>
        <picture>
          <source
            type='image/webp'
            srcSet={`${src}-400w.webp 400w, ${src}-800w.webp 800w, ${src}-1600w.webp 1600w, ${src}-3200w.webp 3200w`}
            sizes='70vw'
          />
          <source
            type='image/jpeg'
            srcSet={`${src}-400w.jpeg 400w, ${src}-800w.jpeg 800w, ${src}-1600w.jpeg 1600w`}
            sizes='70vw'
          />
          <img src={`${src}-400w.jpeg`} alt={data.fields.slug} />
        </picture>
      </div>
      <div className='slider__card'>
        <h1 className='slider__title'>{data.frontmatter.title}</h1>
        <Link className='button' to={`/${data.fields.slug}/`}>
          Lire l'article
        </Link>
      </div>
    </article>
  );
};
