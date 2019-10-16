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
    expect(container.querySelectorAll('h2')).toHaveLength(1);
  });

  it('should return an H3 tag when level is h3', () => {
    const {container} = render(<Heading level='h3' text='foo' />);
    expect(container.querySelectorAll('h3')).toHaveLength(1);
  });

  it('should return an H4 tag when level is h4', () => {
    const {container} = render(<Heading level='h4' text='foo' />);
    expect(container.querySelectorAll('h4')).toHaveLength(1);
  });

  it('should return an anchor tag for H2', () => {
    const {queryAllByTestId, debug} = render(<Heading level='h2' text='foo' />);
    const anchor = queryAllByTestId('heading__anchor');
    expect(anchor).toHaveLength(1);
  });

  it('should return an anchor tag for H3', () => {
    const {queryAllByTestId} = render(<Heading level='h3' text='foo' />);
    const anchor = queryAllByTestId('heading__anchor');
    expect(anchor).toHaveLength(1);
  });

  it('should NOT return an anchor tag for H4', () => {
    const {queryByTestId} = render(<Heading level='h24' text='foo' />);
    const anchor = queryByTestId('heading__anchor');
    expect(anchor).toBe(null);
  });
});
