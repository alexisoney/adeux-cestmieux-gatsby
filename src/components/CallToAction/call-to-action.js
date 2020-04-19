import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'gatsby';

import Cloudinary from '../Cloudinary';
import {frenchNonBreakingSpaces, createLink} from '../utils';
import { useEffect } from 'react';

const CallToAction = ({button, description, image, link, title, localize}) => {
  useEffect(() => {
    const checkLocalisation = async () => {
      try {
        const response = await fetch('http://ip-api.com/json');
        const json = await response.json();
        const {countryCode} = json;
        const locations =  JSON.parse(localize);
        if(locations && locations[countryCode]) {
          Array.from(document.querySelectorAll('.call-to-action a')).forEach(el => {
            el.href = locations[countryCode];
          })
        }
      } catch(err) {

      }
    }
    if (typeof localize === 'string') checkLocalisation();
  },[])

  if ((button && link) || description || image || title) {
    const isInternalLink = link ? link.linktype === 'story' : undefined;
    return (
      <aside data-testid='call-to-action' className='call-to-action'>
        {image && (
          <div data-testid='call-to-action__image' className='call-to-action__image'>
            <Cloudinary src={image} sizes='(max-width: 770px) 50vw, 800px' />
          </div>
        )}
        <div className='call-to-action__content'>
          {title && (
            <h1 data-testid='call-to-action__title' className='call-to-action__title'>
              {frenchNonBreakingSpaces(title)}
            </h1>
          )}
          {description && (
            <p data-testid='call-to-action__description' className='call-to-action__description'>
              {frenchNonBreakingSpaces(description)}
            </p>
          )}
          {button &&
            link &&
            createLink(link.cached_url || link, frenchNonBreakingSpaces(button), {
              testId: 'call-to-action__button',
              class: 'button',
            })}
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
  link: propTypes.oneOfType([propTypes.object,propTypes.string]),
  title: propTypes.string,
};

export default CallToAction;
