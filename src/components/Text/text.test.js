import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Text from './Text';

describe('The Text component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Text />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when no content argument is passed', () => {
    const {container} = render(<Text storyblok={{}} />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when an empty string is passed', () => {
    const {container} = render(<Text storyblok={{content: ''}} />);
    expect(container.firstChild).toBe(null);
  });

  it('should return one paragraph element', () => {
    const {getByText} = render(<Text storyblok={{content: 'placeholder'}} />);
    expect(getByText('placeholder')).toContainHTML('<p>placeholder</p>');
  });

  it('should return a paragraph with spaces', () => {
    const {container} = render(<Text storyblok={{content: ' my text with spaces   '}} />);
    expect(container.firstChild).toContainHTML(`<p> my text with spaces   </p>`);
  });

  it('should return two paragraph elements', () => {
    const {container} = render(<Text storyblok={{content: 'first\n\nsecond'}} />);
    expect(container).toContainHTML('<p>first</p><p>second</p>');
  });

  it('should return two paragraph elements with spaces', () => {
    const {container} = render(<Text storyblok={{content: 'first  \n\nsecond'}} />);
    expect(container).toContainHTML('<p>first  </p><p>second</p>');
  });

  it('should return breaking space', () => {
    const {container} = render(<Text storyblok={{content: 'first  \nsecond'}} />);
    expect(container).toContainHTML('first<br>second');
  });

  it('should return an important text', () => {
    const {container} = render(<Text storyblok={{content: '**placeholder**'}} />);
    expect(container).toContainHTML(`<strong>placeholder</strong>`);
  });

  it('shoulds return an emphasized text', () => {
    const {container} = render(<Text storyblok={{content: '*placeholder*'}} />);
    expect(container).toContainHTML(`<em>placeholder</em>`);
  });

  it('shoulds return an unordered list', () => {
    const {container} = render(<Text storyblok={{content: '* Foo\n* Bar'}} />);
    expect(container).toContainHTML(`<ul><li>Foo</li><li>Bar</li></ul>`);
  });

  it('shoulds return an ordered list', () => {
    const {container} = render(<Text storyblok={{content: '1. Foo\n2. Bar'}} />);
    expect(container).toContainHTML(`<ol><li>Foo</li><li>Bar</li></ol>`);
  });

  it('shoulds return a link', () => {
    const {container} = render(<Text storyblok={{content: '[text](link)'}} />);
    expect(container).toContainHTML(`<a href="link">text</a>`);
  });
});
