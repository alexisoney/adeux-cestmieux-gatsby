import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Cloudinary from './cloudinary';

describe('The Cloudinary component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Cloudinary />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when a non-cloudinary src is passed', () => {
    const {container} = render(<Cloudinary src='https://myimage.com' />);
    expect(container.firstChild).toBe(null);
  });

  it('should return an image tag when a Cloudinary src is passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelectorAll('img')).toHaveLength(1);
  });

  it('should return an alternative text when it get an alt property', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary alt='some text' src={src} />);
    expect(container.querySelector('img')).toHaveProperty('alt', 'some text');
  });

  it('should return a picture tag', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelectorAll('picture')).toHaveLength(1);
  });

  it('should return only one source tag', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelectorAll('picture > source')).toHaveLength(1);
  });

  it('should return a default optimized src', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const optimizedUrl = 'https://res.cloudinary.com/cloud/image/upload/w_630,q_auto/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should return a default optimized jpg src when it gets another format', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud/image/upload/w_630,q_auto/another_image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should accept a Cloudinary version number', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/version/image.jpg';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud/image/upload/w_630,q_auto/version/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should accept numbers in the src', () => {
    const src =
      'https://res.cloudinary.com/cloud123456789abcd/image/upload/version1234567/image.jpg';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud123456789abcd/image/upload/w_630,q_auto/version1234567/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should accept special characters in the src', () => {
    const src = 'https://res.cloudinary.com/cloud%20abcd-abcd_abcde/image/upload/version/image.jpg';
    const optimizedUrl =
      'https://res.cloudinary.com/cloud%20abcd-abcd_abcde/image/upload/w_630,q_auto/version/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img').dataset.src).toBe(optimizedUrl);
  });

  it('should return a webp source tag', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('source')).toHaveAttribute('type', 'image/webp');
  });

  it('should return an image tag with default sizes', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img')).toHaveAttribute(
      'sizes',
      '(max-width: 770px) 100vw, 630px'
    );
  });

  it('should return a source tag with default sizes', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('source')).toHaveProperty(
      'sizes',
      '(max-width: 770px) 100vw, 630px'
    );
  });

  it('should return an image tag with a custom size', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} sizes='100vw' />);
    expect(container.querySelector('img')).toHaveProperty('sizes', '100vw');
  });

  it('should return a source tag with a custom size', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} sizes='75vw' />);
    expect(container.querySelector('source')).toHaveProperty('sizes', '75vw');
  });

  it('should return an image tag with a default jpg srcset', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/image.jpg 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/image.jpg 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/image.jpg 1300w',
    ];
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return a source tag with a default webp srcset', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/image.webp 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/image.webp 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/image.webp 1300w',
    ];
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('source').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an image tag with a default jpg srcset when it gets a non-jpg file', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/another_image.jpg 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/another_image.jpg 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/another_image.jpg 1300w',
    ];
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an source tag with a default webp srcset when it gets a non-jpg file', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/another_image.webp 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/another_image.webp 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1300,q_auto/another_image.webp 1300w',
    ];
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('source').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an image tag with a custom jpg srcset', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_100,q_auto/image.jpg 100w',
      'https://res.cloudinary.com/cloud/image/upload/w_255,q_auto/image.jpg 255w',
    ];
    const {container} = render(<Cloudinary src={src} srcset={[100, 255]} />);
    expect(container.querySelector('img').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return a source tag with a custom webp srcset', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_1000,q_auto/image.webp 1000w',
      'https://res.cloudinary.com/cloud/image/upload/w_135,q_auto/image.webp 135w',
    ];
    const {container} = render(<Cloudinary src={src} srcset={[1000, 135]} />);
    expect(container.querySelector('source').dataset.srcset).toBe(srcSet.join(','));
  });

  it('should return an image tag with a low definition jpg src', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img')).toHaveProperty(
      'src',
      'https://res.cloudinary.com/cloud/image/upload/w_10,q_30,e_blur/image.jpg'
    );
  });

  it('should return an image tag with a low definition jpg src when it gets a different format', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/another_image.png';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img')).toHaveProperty(
      'src',
      'https://res.cloudinary.com/cloud/image/upload/w_10,q_30,e_blur/another_image.jpg'
    );
  });

  it('should return a srcset in source when lazyload false is passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} lazyload={false} />);
    expect(container.querySelector('source')).toHaveAttribute('srcset');
  });

  it('should NOT return a srcset in source when lazyload is NOT passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('source')).not.toHaveAttribute('srcset');
  });

  it('should return a srcset in img when lazyload false is passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} lazyload={false} />);
    expect(container.querySelector('img')).toHaveAttribute('srcset');
  });

  it('should NOT return a srcset in img when lazyload is NOT passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} />);
    expect(container.querySelector('img')).not.toHaveAttribute('srcset');
  });

  it('should use default image src when lazyload false is passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} lazyload={false} />);
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/cloud/image/upload/w_630,q_auto/image.jpg'
    );
  });

  it('should set wide class when wide argument is passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {getByTestId} = render(<Cloudinary src={src} wide />);
    expect(getByTestId('cloudinary')).toHaveClass('cloudinary--is-wide');
  });

  it('should return defined size when wide is passed', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const {container} = render(<Cloudinary src={src} wide />);
    expect(container.querySelector('source')).toHaveProperty(
      'sizes',
      '(max-width: 1060px) 100vw, 1060px'
    );
  });

  it('should return an image tag with a srcset adapted to wide argument', () => {
    const src = 'https://res.cloudinary.com/cloud/image/upload/image.jpg';
    const srcSet = [
      'https://res.cloudinary.com/cloud/image/upload/w_400,q_auto/image.jpg 400w',
      'https://res.cloudinary.com/cloud/image/upload/w_800,q_auto/image.jpg 800w',
      'https://res.cloudinary.com/cloud/image/upload/w_1060,q_auto/image.jpg 1060w',
      'https://res.cloudinary.com/cloud/image/upload/w_2120,q_auto/image.jpg 2120w',
    ];
    const {container} = render(<Cloudinary src={src} wide />);
    expect(container.querySelector('img').dataset.srcset).toBe(srcSet.join(','));
  });
});
