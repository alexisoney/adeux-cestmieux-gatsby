import React from 'react';
import {Link} from 'gatsby';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';

import {NavigationRoutes, SocialMediasLinks} from '../../constant/routes';

import SiteTitle from './SiteTitle';

import './activeLinkStyle.scss';

export default () => (
  <nav className='navigation--wide'>
    <SiteTitle className={'navigation__title'} />
    <div className='navigation__items'>
      {NavigationRoutes.map(({to, txt}, index) => (
        <Link
          key={index}
          to={to}
          className='navigation__item'
          activeClassName='header__link--is-active'
        >
          {txt}
        </Link>
      ))}
      <a
        href={SocialMediasLinks.instagram}
        aria-label='Instagram'
        className='navigation__item navigation__item--social'
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  </nav>
);
