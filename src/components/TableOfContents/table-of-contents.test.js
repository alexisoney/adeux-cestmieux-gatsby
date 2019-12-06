import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import {createAnchorLink} from '../utils';

import TableOfContents from './table-of-contents';

describe('The Heading component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<TableOfContents />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when an empty content is passed', () => {
    const {container} = render(<TableOfContents content={[]} />);
    expect(container.firstChild).toBe(null);
  });

  it('should return null when non-heading items are passed', () => {
    const content = [
      {
        component: 'text',
        content: 'Some text',
        _uid: 'f01f8030-dff1-4cf5-9628-7d058b88a356',
      },
    ];
    const {container} = render(<TableOfContents content={content} />);
    expect(container.firstChild).toBe(null);
  });

  it('should return a title item when a valid content is passed', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '73f018b5-f0f9-4cdc-8aac-55a37b2db850',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);
    const tableOfContent = getByTestId('table-of-contents');
    const title = getByTestId('table-of-contents__title');

    expect(tableOfContent).toContainElement(title);
  });

  it('should return an unordered item when an H2 block is passed', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '73f018b5-f0f9-4cdc-8aac-55a37b2db850',
      },
    ];
    const {container} = render(<TableOfContents content={content} />);
    expect(container.querySelectorAll('li')).toHaveLength(1);
  });

  it('should nest h3 headings under h2', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: 'f01f8030-dff1-4cf5-9628-7d058b88a356',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Heading H3',
        tocHide: false,
        tocText: '',
        _uid: '73f018b5-f0f9-4cdc-8aac-55a37b2db850',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);

    const tableOfContents = getByTestId('table-of-contents');
    const nestedList = getByTestId('table-of-contents__nested-items');

    expect(tableOfContents).toContainElement(nestedList);
  });

  it('should NOT render lonely h3', () => {
    const content = [
      {
        component: 'heading',
        level: 'h3',
        text: 'Heading H3',
        tocHide: false,
        tocText: '',
        _uid: '73f018b5-f0f9-4cdc-8aac-55a37b2db850',
      },
    ];
    const {container} = render(<TableOfContents content={content} />);
    expect(container.firstChild).toBe(null);
  });

  it('should not render h4', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '1',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Heading H3',
        tocHide: false,
        tocText: '',
        _uid: '2',
      },
      {
        component: 'heading',
        level: 'h4',
        text: 'Heading H3',
        tocHide: false,
        tocText: '',
        _uid: '3',
      },
    ];

    const {getAllByTestId} = render(<TableOfContents content={content} />);

    const nestedItems = getAllByTestId('table-of-contents__nested-item');

    expect(nestedItems).toHaveLength(1);
  });

  it('should render custom text for h2', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: 'A custom text',
        _uid: '73f018b5-f0f9-4cdc-8aac-55a37b2db850',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);
    const item = getByTestId('table-of-contents__link');

    expect(item.textContent).toBe('A custom text');
  });

  it('should render custom text for h3', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '1',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Heading H3',
        tocHide: false,
        tocText: 'A custom H3',
        _uid: '2',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);
    const item = getByTestId('table-of-contents__nested-link');

    expect(item.textContent).toBe('A custom H3');
  });

  it('should hide h2 when hide is true', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: true,
        tocText: '',
        _uid: '1',
      },
    ];

    const {container} = render(<TableOfContents content={content} />);

    expect(container.firstChild).toBe(null);
  });

  it('should hide h3 when hide is true for h3', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading 1 H2',
        tocHide: false,
        tocText: '',
        _uid: '1',
      },
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading 2 H2',
        tocHide: true,
        tocText: '',
        _uid: '2',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Heading H3',
        tocHide: false,
        tocText: 'A custom H3',
        _uid: '3',
      },
    ];

    const {queryByTestId} = render(<TableOfContents content={content} />);
    const item = queryByTestId('table-of-contents__nested-link');

    expect(item).toBe(null);
  });

  it('should hide h3 when hide is true', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '1',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Heading H3',
        tocHide: true,
        tocText: 'A custom H3',
        _uid: '3',
      },
    ];

    const {queryByTestId} = render(<TableOfContents content={content} />);
    const item = queryByTestId('table-of-contents__nested-link');

    expect(item).toBe(null);
  });

  it('should link to the anchor for h2', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '1',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);
    const link = getByTestId('table-of-contents__link');

    expect(link).toHaveAttribute('href', `#${createAnchorLink(content[0].text)}`);
    expect(link).toHaveAttribute('id', `hotjar-${createAnchorLink(content[0].text)}`);
  });

  it('should link to the anchor for h3', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '1',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'My headline _ ! @',
        tocHide: false,
        tocText: '',
        _uid: '2',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);
    const link = getByTestId('table-of-contents__nested-link');

    expect(link).toHaveAttribute('href', `#${createAnchorLink(content[1].text)}`);
    expect(link).toHaveAttribute('id', `hotjar-${createAnchorLink(content[1].text)}`);
  });

  it('should link based on custom text to the anchor for h2', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: 'Custom custom custom!',
        _uid: '1',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);
    const link = getByTestId('table-of-contents__link');

    expect(link).toHaveAttribute('href', `#${createAnchorLink(content[0].tocText)}`);
    expect(link).toHaveAttribute('id', `hotjar-${createAnchorLink(content[0].tocText)}`);
  });

  it('should link based on custom text to the anchor for h3', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: 'Heading H2',
        tocHide: false,
        tocText: '',
        _uid: '1',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'My headline _ ! @',
        tocHide: false,
        tocText: 'Well! Use this one.',
        _uid: '2',
      },
    ];

    const {getByTestId} = render(<TableOfContents content={content} />);
    const link = getByTestId('table-of-contents__nested-link');

    expect(link).toHaveAttribute('href', `#${createAnchorLink(content[1].tocText)}`);
    expect(link).toHaveAttribute('id', `hotjar-${createAnchorLink(content[1].tocText)}`);
  });
});
