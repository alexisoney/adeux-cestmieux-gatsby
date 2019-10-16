import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Cloudinary from './cloudinary';

describe('The Cloudinary component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Cloudinary />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when a non-cloudinary url is passed', () => {
    const {container} = render(<Cloudinary url='https://myimage.com' />);
    expect(container.firstChild).toBe(null);
  });

  it('should return an image tag when a Cloudinary url is passed', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelectorAll('img')).toHaveLength(1);
  });

  it('should return an alternative text when it get an alt property', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary alt='some text' url={url} />);
    expect(container.querySelector('img')).toHaveProperty('alt', 'some text');
  });

  it('should return a picture tag', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelectorAll('picture')).toHaveLength(1);
  });

  it('should return only one source tag', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelectorAll('picture > source')).toHaveLength(1);
  });

  it('should return a default optimized src', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const optimizedUrl = 'https://res.cloudinary.com/cloud/image/upload/w_630,q_auto/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should return a default optimized jpg src when it gets another format', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud/image/upload/w_630,q_auto/another_image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should accept a Cloudinary version number', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/version/image.jpg';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud/image/upload/w_630,q_auto/version/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should accept numbers in the url', () => {
    const url =
      'https://res.cloudinary.com/cloud123456789abcd/image/upload/version1234567/image.jpg';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud123456789abcd/image/upload/w_630,q_auto/version1234567/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should accept special characters in the url', () => {
    const url = 'https://res.cloudinary.com/cloud%20abcd-abcd_abcde/image/upload/version/image.jpg';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud%20abcd-abcd_abcde/image/upload/w_630,q_auto/version/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should return a webp source tag', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('source')).toHaveAttribute('type', 'image/webp');
  });

  it('should return an image tag with default sizes', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img')).toHaveAttribute(
      'sizes',
      '(max-width: 770px) 100vw, 630px'
    );
  });

  it('should return a source tag with default sizes', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('source')).toHaveProperty(
      'sizes',
      '(max-width: 770px) 100vw, 630px'
    );
  });

  it('should return an image tag with a custom size', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} sizes='100vw' />);
    expect(container.querySelector('img')).toHaveProperty('sizes', '100vw');
  });

  it('should return a source tag with a custom size', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} sizes='75vw' />);
    expect(container.querySelector('source')).toHaveProperty('sizes', '75vw');
  });

  it('should return an image tag with a default jpg srcset', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/image.jpg 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/image.jpg 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/image.jpg 1300w',
    ];
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return a source tag with a default webp srcset', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/image.webp 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/image.webp 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/image.webp 1300w',
    ];
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('source').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an image tag with a default jpg srcset when it gets a non-jpg file', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/another_image.jpg 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/another_image.jpg 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/another_image.jpg 1300w',
    ];
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an source tag with a default webp srcset when it gets a non-jpg file', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/another_image.webp 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/another_image.webp 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/another_image.webp 1300w',
    ];
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('source').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an image tag with a custom jpg srcset', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_100,q_auto/image.jpg 100w',
      'https://res.cloudinary.com/cloud/image/upload/w_255,q_auto/image.jpg 255w',
    ];
    const {container} = render(<Cloudinary url={url} srcset={[100, 255]} />);
    expect(container.querySelector('img').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return a source tag with a custom webp srcset', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_1000,q_auto/image.webp 1000w',
      'https://res.cloudinary.com/cloud/image/upload/w_135,q_auto/image.webp 135w',
    ];
    const {container} = render(<Cloudinary url={url} srcset={[1000, 135]} />);
    expect(container.querySelector('source').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an image tag with the lazyload class', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img')).toHaveClass('lazyload');
  });

  it('should return an image tag with a low definition jpg src', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img')).toHaveProperty(
      'src',
      'https://res.cloudinary.com/cloud/image/upload/w_10,q_30,e_blur/image.jpg'
    );
  });

  it('should return an image tag with a low definition jpg src when it gets a different format', () => {
    const url = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const {container} = render(<Cloudinary url={url} />);
    expect(container.querySelector('img')).toHaveProperty(
      'src',
      'https://res.cloudinary.com/cloud/image/upload/w_10,q_30,e_blur/another_image.jpg'
    );
  });
});
