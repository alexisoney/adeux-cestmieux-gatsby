import React from 'react';
import {Link} from 'gatsby';
import removeAccent from 'remove-accents';

export function createAnchorLink(string) {
  return removeAccent(string)
    .replace(/\W/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/\W$/g, '')
    .toLowerCase();
}

export function frenchNonBreakingSpaces(string) {
  if (typeof string !== 'string') return null;

  return string
    .replace(/ \?/g, ' ?')
    .replace(/ !/g, ' !')
    .replace(/ :/g, ' :');
}

export function createLink(href, text, options = {}) {
  if (
    typeof href === 'undefined' ||
    typeof href !== 'string' ||
    typeof text === 'undefined' ||
    typeof text !== 'string'
  ) {
    return null;
  }

  let link = href.trim();
  let isInternal = false;

  if (
    !link.startsWith('www') &&
    !link.startsWith('http') &&
    !link.startsWith('/') &&
    !link.includes('.')
  ) {
    link = '/' + link;
  }

  if (href.includes('adeux-cestmieux.com')) {
    isInternal = true;
    link = link.split('adeux-cestmieux.com')[1];
    if (link.endsWith('/')) {
      link = link.substr(0, link.length - 1);
    }
  }

  if (link.startsWith('/')) {
    isInternal = true;
    if (link.endsWith('/')) {
      link = link.substr(0, link.length - 1);
    }
    const lastPath = link.lastIndexOf('/');
    link = link.substr(lastPath);
  }

  if (isInternal) {
    return (
      <Link to={link} className={options.class} data-testid={options.testId}>
        {text}
      </Link>
    );
  }

  if (!link.includes('://')) {
    link = 'https://' + href;
  }

  return (
    <a
      href={link}
      className={options.class}
      target='_blank'
      rel='noopener noreferrer'
      data-testid={options.testId}
    >
      {text}
    </a>
  );
}
