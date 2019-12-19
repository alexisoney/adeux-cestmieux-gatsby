import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Video from './video';

describe('The Video component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Video />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when src is an empty string', () => {
    const {container} = render(<Video src={''} />);
    expect(container.firstChild).toBe(null);
  });

  it('should return a video container', () => {
    const {getAllByTestId} = render(<Video src={'source'} />);
    expect(getAllByTestId('video')).toHaveLength(1);
  });

  it('should return an iframe container', () => {
    const {getByTestId} = render(<Video src={'source'} />);
    expect(getByTestId('video__iframe').tagName).toBe('IFRAME');
  });

  it('should return an iframe with a title', () => {
    const {getByTestId} = render(<Video src={'source'} />);
    expect(getByTestId('video__iframe')).toHaveAttribute('title');
  });

  it('should return an iframe with a frameBorder property set to 0', () => {
    const {getByTestId} = render(<Video src={'source'} />);
    expect(getByTestId('video__iframe')).toHaveAttribute('frameborder', '0');
  });

  it('should return an iframe allowing fullscreen', () => {
    const {getByTestId} = render(<Video src={'source'} />);
    expect(getByTestId('video__iframe')).toHaveAttribute('allowfullscreen');
  });
});
