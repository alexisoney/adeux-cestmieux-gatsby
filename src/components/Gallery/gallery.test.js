import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Gallery from './gallery';

describe('The Heading component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Gallery />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when images argument is not an array', () => {
    const {container} = render(<Gallery />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when images array is empty', () => {
    const {container} = render(<Gallery />);
    expect(container.firstChild).toBe(null);
  });

  it('should return an element with class gallery when images array is not empty', () => {
    let images = [];
    for (let i = 0; i < 3; i++) {
      images.push({
        src: 'https://res.cloudinary.com/cloud/image/upload/image.jpg',
        alt: 'alt',
        _uid: i,
      });
    }
    const {container} = render(<Gallery images={images} />);
    expect(container.firstChild).toHaveClass('gallery');
  });

  it('should return gallery items when images array has 3 items', () => {
    let images = [];
    for (let i = 0; i < 3; i++) {
      images.push({
        src: 'https://res.cloudinary.com/cloud/image/upload/image.jpg',
        alt: 'alt',
        _uid: i,
      });
    }
    const {container} = render(<Gallery images={images} />);
    expect(container.querySelectorAll('.gallery__item')).toHaveLength(3);
  });

  it('should return 3 images elements when images array has 3 items', () => {
    let images = [];
    for (let i = 0; i < 3; i++) {
      images.push({
        src: 'https://res.cloudinary.com/cloud/image/upload/image.jpg',
        alt: 'alt',
        _uid: i,
      });
    }
    const {container} = render(<Gallery images={images} />);
    expect(container.querySelectorAll('img')).toHaveLength(3);
  });
});
