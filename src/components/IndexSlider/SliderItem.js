import React from 'react';
import {Link} from 'gatsby';
import {months} from '../../constant/text';

export default props => {
  const data = props.data;
  const date = new Date(data.fields.date);
  const hero = `${data.frontmatter.hero.publicURL}?nf_resize=fit&w=`;

  return (
    <article className={'slider__item slider__item--is-' + props.className} onClick={props.onClick}>
      <div className='slider__hero'>
        <img
          data-srcSet={`${hero}400 400w, ${hero}800 800w, ${hero}1600 1600w`}
          sizes='70vw'
          src={`${hero}20`}
          alt={data.fields.slug}
          class='lazyload'
        />
      </div>
      <div className='slider__date'>
        {date.getDate()} <br /> {months[date.getMonth()]}
      </div>
      <div className='slider__card'>
        <h1 className='slider__title'>{data.frontmatter.title}</h1>
        <Link className='button' to={`/${data.fields.slug}`}>
          Lire l'article
        </Link>
      </div>
    </article>
  );
};
