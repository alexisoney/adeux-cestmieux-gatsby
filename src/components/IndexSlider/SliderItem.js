import React from 'react';
import {Link} from 'gatsby';
import {months} from '../../constant/text';

export default props => {
  const data = props.data;
  const date = new Date(data.fields.date);

  return (
    <article className={'slider__item slider__item--is-' + props.className} onClick={props.onClick}>
      <div className='slider__hero'>
        <picture>
          <source
            type='image/webp'
            srcSet={data.frontmatter.hero.childImageSharp.fluid.srcSetWebp}
            sizes='63vw'
          />
          <source srcSet={data.frontmatter.hero.childImageSharp.fluid.srcSet} sizes='63vw' />
          <img src={data.frontmatter.hero.childImageSharp.fluid.src} alt={data.fields.slug} />
        </picture>
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
