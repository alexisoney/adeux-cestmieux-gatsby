import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {Link} from 'gatsby';

import {createLink} from './utils';

describe('The createLink function', () => {
  it('should return null when href is missing', () => {
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(undefined, text));
    expect(container.firstChild).toBe(null);
  });

  it('should return null when href is not a string', () => {
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(12345, text));
    expect(container.firstChild).toBe(null);
  });

  it('should return null when text is missing', () => {
    const href = 'https://adeux-cestmieux.com/journee-nationale-de-la-tulipe';

    const {container} = render(createLink(href));
    expect(container.firstChild).toBe(null);
  });

  it('should return null when text is not a string', () => {
    const href = 'https://adeux-cestmieux.com/journee-nationale-de-la-tulipe';

    const {container} = render(createLink(href, 123456));
    expect(container.firstChild).toBe(null);
  });

  it('should return the text', () => {
    const href = 'https://adeux-cestmieux.com/journee-nationale-de-la-tulipe';
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(href, text));

    expect(container.textContent).toBe(text);
  });

  it('should transform internal link with protocol', () => {
    const href = 'https://adeux-cestmieux.com/journee-nationale-de-la-tulipe';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should remove trailing slash for internal links with protocol', () => {
    const href = 'https://adeux-cestmieux.com/journee-nationale-de-la-tulipe/';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should trim internal links with protocol', () => {
    const href = ' https://adeux-cestmieux.com/journee-nationale-de-la-tulipe/   ';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should transform internal link without slash', () => {
    const href = 'journee-nationale-de-la-tulipe';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should transform internal link without slash and with folder', () => {
    const href = 'visiter-amsterdam/journee-nationale-de-la-tulipe';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should remove folder for internal links', () => {
    const href = '/visiter-amsterdam/journee-nationale-de-la-tulipe';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should remove two folders for internal links', () => {
    const href = '/visiter-amsterdam/ete/journee-nationale-de-la-tulipe';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should remove trailing slash for internal links with folder', () => {
    const href = '/visiter-amsterdam/journee-nationale-de-la-tulipe/';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should trim internal links with folder', () => {
    const href = '   /visiter-amsterdam/journee-nationale-de-la-tulipe/   ';
    const text = 'The quick brown fox jumps over the lazy dog';

    const result = render(createLink(href, text));
    const expected = render(<Link to='/journee-nationale-de-la-tulipe'>{text}</Link>);

    expect(result.container).toStrictEqual(expected.container);
  });

  it('should return an external link for https', () => {
    const href = 'https://google.com';
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(href, text));

    expect(container.firstChild).toHaveAttribute('href', 'https://google.com');
  });

  it('should return an external link for http', () => {
    const href = 'https://google.com';
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(href, text));

    expect(container.firstChild).toHaveAttribute('href', 'https://google.com');
  });

  it('should return an external link for www', () => {
    const href = 'www.google.com';
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(href, text));

    expect(container.firstChild).toHaveAttribute('href', 'https://www.google.com');
  });

  it('should return an external link for url containing a dot', () => {
    const href = 'google.com';
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(href, text));

    expect(container.firstChild).toHaveAttribute('href', 'https://google.com');
  });

  it('should trim external link', () => {
    const href = '   https://www.google.com    ';
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(href, text));

    expect(container.firstChild).toHaveAttribute('href', 'https://www.google.com');
  });

  it('should return target _blank for external links', () => {
    const href = 'https://www.google.com';
    const text = 'The quick brown fox jumps over the lazy dog';

    const {container} = render(createLink(href, text));

    expect(container.firstChild).toHaveAttribute('target', '_blank');
  });

  it('should return the className option for internal links', () => {
    const href = '/internal-link';
    const text = 'The quick brown fox jumps over the lazy dog';
    const options = {
      class: 'className',
    };

    const {container} = render(createLink(href, text, options));

    expect(container.firstChild).toHaveAttribute('class', 'className');
  });

  it('should return the className option for external links', () => {
    const href = 'https://www.google.com';
    const text = 'The quick brown fox jumps over the lazy dog';
    const options = {
      class: 'className',
    };

    const {container} = render(createLink(href, text, options));

    expect(container.firstChild).toHaveAttribute('class', 'className');
  });

  it('should return the data-testid option for internal links', () => {
    const href = 'https://adeux-cestmieux.com/internal-link';
    const text = 'The quick brown fox jumps over the lazy dog';
    const options = {
      testId: 'my-id',
    };

    const {container} = render(createLink(href, text, options));

    expect(container.firstChild).toHaveAttribute('data-testid', 'my-id');
  });

  it('should return the data-testid option for external links', () => {
    const href = 'https://www.google.com';
    const text = 'The quick brown fox jumps over the lazy dog';
    const options = {
      testId: 'my-id',
    };

    const {container} = render(createLink(href, text, options));

    expect(container.firstChild).toHaveAttribute('data-testid', 'my-id');
  });
});
