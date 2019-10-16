import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Heading from './heading';

describe('The Heading component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Heading />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when text argument is missing', () => {
    const {container} = render(<Heading level='h2' />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when level argument is not h2, h3 or h4', () => {
    const {container} = render(<Heading level='h5' text='foo' />);
    expect(container.firstChild).toBe(null);
  });

  it('should return an H2 tag when level is h2', () => {
    const {container} = render(<Heading level='h2' text='foo' />);
    expect(container.firstChild).toContainHTML('<h2>foo</h2>');
  });

  it('should return an H3 tag when level is h3', () => {
    const {container} = render(<Heading level='h3' text='foo' />);
    expect(container.firstChild).toContainHTML('<h3>foo</h3>');
  });

  it('should return an H4 tag when level is h4', () => {
    const {container} = render(<Heading level='h4' text='foo' />);
    expect(container.firstChild).toContainHTML('<h4>foo</h4>');
  });
});
