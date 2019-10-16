import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'gatsby';

import Cloudinary from '../Cloudinary';

const CallToAction = ({button, description, image, link, title}) => {
  if ((button && link) || description || image || title) {
    const isInternalLink = link ? link.linktype === 'story' : undefined;
    return (
      <aside data-testid='call-to-action' className='call-to-action'>
        {image && (
          <div data-testid='call-to-action__image' className='call-to-action__image'>
            <Cloudinary src={image} sizes='(max-width: 770px) 34vw, 6vw' srcset={[400, 800]} />
          </div>
        )}
        <div className='call-to-action__content'>
          {title && (
            <h1 data-testid='call-to-action__title' className='call-to-action__title'>
              {title}
            </h1>
          )}
          {description && (
            <p data-testid='call-to-action__description' className='call-to-action__description'>
              {description}
            </p>
          )}
          {button && link && isInternalLink && (
            <Link data-testid='call-to-action__button' className='button' to={link.cached_url} />
          )}
          {button && link && !isInternalLink && (
            <a data-testid='call-to-action__button' className='button' href={link.url}>
              {button}
            </a>
          )}
        </div>
      </aside>
    );
  }
  return null;
};

CallToAction.propTypes = {
  button: propTypes.string,
  description: propTypes.string,
  image: propTypes.string,
  link: propTypes.object,
  title: propTypes.string,
};

export default CallToAction;
