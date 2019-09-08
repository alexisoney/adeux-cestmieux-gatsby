import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Text from './Text';

describe('The Text component', () => {
  it('should return null when no arguments are passed', () => {
    const {queryByTestId} = render(<Text />);
    expect(queryByTestId('container')).toBe(null);
  });

  it('should return null when no content argument is passed', () => {
    const {queryByTestId} = render(<Text storyblok={{}} />);
    expect(queryByTestId('container')).toBe(null);
  });

  it('should return null when an empty string is passed', () => {
    const {queryByTestId} = render(<Text storyblok={{content: ''}} />);
    expect(queryByTestId('container')).toBe(null);
  });

  it('should return a Text element', () => {
    const {getByTestId} = render(<Text storyblok={{content: 'placeholder'}} />);
    expect(getByTestId('container')).toContainHTML(`<p>placeholder</p>`);
  });

  it('should return a Text element with spaces', () => {
    const {getByTestId} = render(<Text storyblok={{content: ' my text with spaces   '}} />);
    expect(getByTestId('container')).toContainHTML(`<p> my text with spaces   </p>`);
  });

  it('should return a strong element', () => {
    const {getByTestId} = render(<Text storyblok={{content: '**placeholder**'}} />);
    expect(getByTestId('container')).toContainHTML(`<strong>placeholder</strong>`);
  });

  it('should return a strong element with spaces', () => {
    const {getByTestId} = render(<Text storyblok={{content: '** with spaces  **'}} />);
    expect(getByTestId('container')).toContainHTML(`<strong> with spaces  </strong>`);
  });
});
