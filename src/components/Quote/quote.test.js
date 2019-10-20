import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Quote from './quote';
import Text from '../Text';

describe('The Quote component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<Quote />);
    expect(container.firstChild).toBe(null);
  });

  it('should return a text component', () => {
    const content = [
      {
        component: 'text',
        content: 'Foo Bar Baz',
        _uid: '11ea8bb9-9c7a-4a54-b1f2-b14c0d58d6f0',
      },
    ];
    const {container} = render(<Quote content={content} />);
    expect(container.querySelector('p')).toHaveTextContent(content[0].content);
  });

  it('should return two text component', () => {
    const content = [
      {
        component: 'text',
        content: 'Foo Bar Baz',
        _uid: '1',
      },
      {
        component: 'text',
        content: 'Foo Bar Baz',
        _uid: '2',
      },
    ];
    const {container} = render(<Quote content={content} />);
    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('should only return text component', () => {
    const content = [
      {
        component: 'text',
        content: 'Foo Bar Baz',
        _uid: '1',
      },
      {
        component: 'not-text',
        content: 'Foo Bar Baz',
        _uid: '2',
      },
    ];
    const {container} = render(<Quote content={content} />);
    expect(container.querySelectorAll('p')).toHaveLength(1);
  });

  it('should return a blockquote', () => {
    const content = [
      {
        component: 'text',
        content: 'Foo Bar Baz',
        _uid: '1',
      },
    ];
    const {container} = render(<Quote content={content} />);
    expect(container.querySelectorAll('blockquote')).toHaveLength(1);
  });
});
