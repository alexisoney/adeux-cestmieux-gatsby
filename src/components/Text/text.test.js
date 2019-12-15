import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Text from './text';

describe('The Text component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Text />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when an empty string is passed', () => {
    const {container} = render(<Text text={''} />);
    expect(container.firstChild).toBe(null);
  });

  it('should return one paragraph element', () => {
    const {getByText} = render(<Text text={'placeholder'} />);
    expect(getByText('placeholder')).toContainHTML('<p>placeholder</p>');
  });

  it('should return a paragraph with spaces', () => {
    const {container} = render(<Text text={' my text with spaces   '} />);
    expect(container.firstChild).toContainHTML(`<p> my text with spaces   </p>`);
  });

  it('should return two paragraph elements', () => {
    const {container} = render(<Text text={'first\n\nsecond'} />);
    expect(container).toContainHTML('<p>first</p><p>second</p>');
  });

  it('should return two paragraph elements with spaces', () => {
    const {container} = render(<Text text={'first  \n\nsecond'} />);
    expect(container).toContainHTML('<p>first  </p><p>second</p>');
  });

  it('should return breaking space', () => {
    const {container} = render(<Text text={'first  \nsecond'} />);
    expect(container).toContainHTML('first<br>second');
  });

  it('should return an important text', () => {
    const {container} = render(<Text text={'**placeholder**'} />);
    expect(container).toContainHTML(`<strong>placeholder</strong>`);
  });

  it('should return an emphasized text', () => {
    const {container} = render(<Text text={'*placeholder*'} />);
    expect(container).toContainHTML(`<em>placeholder</em>`);
  });

  it('should return an unordered list', () => {
    const {container} = render(<Text text={'* Foo\n* Bar'} />);
    expect(container).toContainHTML(`<ul><li>Foo</li><li>Bar</li></ul>`);
  });

  it('should return an ordered list', () => {
    const {container} = render(<Text text={'1. Foo\n2. Bar'} />);
    expect(container).toContainHTML(`<ol><li>Foo</li><li>Bar</li></ol>`);
  });

  it('should return a link', () => {
    const {container} = render(<Text text={'[text](/internal-link)'} />);
    expect(container).toContainHTML(`<a href="/internal-link">text</a>`);
  });

  it('should return a blockquote', () => {
    const {container} = render(<Text text={'[text](link)'} quote />);
    expect(container.firstChild.tagName).toBe('blockquote'.toUpperCase());
  });
});
