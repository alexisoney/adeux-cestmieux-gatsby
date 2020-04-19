import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'gatsby';

import Cloudinary from '../Cloudinary';
import {frenchNonBreakingSpaces, createLink} from '../utils';
import { useEffect } from 'react';

export const ipDataApi = 'https://api.ipdata.co/?api-key=0d04a9cd3ac8f7f5e87a2d1935c3c11d02e3773cba65a86dc93b3f8e'

const CallToAction = ({button, description, image, link, title, localize}) => {
  useEffect(() => {
    const checkLocalisation = async () => {
      try {
        const response = await fetch(ipDataApi);
        const json = await response.json();
        const {country_code} = json;
        const locations =  JSON.parse(localize);
        if(locations && locations[country_code]) {
          Array.from(document.querySelectorAll('.call-to-action a')).forEach(el => {
            el.href = locations[country_code];
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
