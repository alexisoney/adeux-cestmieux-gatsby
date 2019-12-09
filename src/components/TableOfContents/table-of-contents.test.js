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

  it('should contain all h3 headings', () => {
    const content = [
      {
        component: 'heading',
        level: 'h2',
        text: '24h à Amsterdam',
        tocHide: false,
        _uid: '9cc40e16-f71b-4da4-87cf-e3650d7eafbf',
      },
      {
        component: 'heading',
        level: 'h2',
        text: 'Itinéraire pour visiter Amsterdam en une journée',
        tocHide: false,
        _uid: '73cdccb2-fa46-49fe-9e65-80b0b2b93783',
      },
      {
        component: 'heading',
        coordinates: '52.3791283,4.900272',
        level: 'h3',
        text: 'Départ de Amsterdam Centraal',
        tocHide: false,
        _uid: 'a2c26d00-23a5-4e62-a1a0-b929f1a86e27',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Amsterdam : le centre-ville historique',
        tocHide: false,
        _uid: 'bcdc6875-aa8f-40e1-9b60-5e2a10f7571d',
      },
      {
        component: 'heading',
        coordinates: '52.375456, 4.896190',
        level: 'h4',
        text: 'Het Damrak',
        tocHide: false,
        _uid: 'd3d10dfb-efbc-4c09-aede-b2fb7c03651f',
      },
      {
        component: 'heading',
        coordinates: '52.373059, 4.892510',
        level: 'h4',
        text: 'De Dam : la place du Dam',
        tocHide: false,
        _uid: '7a979a0b-cef8-47cc-a046-8abae9e599e9',
      },
      {
        component: 'heading',
        coordinates: '52.369558, 4.890087',
        level: 'h4',
        text: 'Het Begijnhof : le béguinage',
        tocHide: false,
        _uid: '3430a518-b4fa-4ec2-abfd-a0f7d8aa8f13',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'De Bloemenmarkt : le marché aux fleurs',
        tocHide: false,
        _uid: '15be88b7-7884-4746-9168-a8c03913b762',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Rembrandtplein : la place Rembrandt',
        tocHide: false,
        _uid: '20f76dda-a581-4030-b8f1-ebf79d8fc728',
      },
      {
        component: 'heading',
        level: 'h4',
        text: 'Amsterdam, muse de Rembrandt.',
        tocHide: false,
        _uid: 'f10228fc-1117-44b1-80d8-4ae49852e3b8',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Pause déjeuner',
        tocHide: false,
        _uid: '8c635a04-c63b-4db3-8069-040b537609eb',
      },
      {
        component: 'heading',
        level: 'h4',
        text: 'Meat & Greek',
        tocHide: false,
        _uid: 'ce3d7de3-9acc-4f9b-9863-c0cc6472399f',
      },
      {
        component: 'heading',
        level: 'h4',
        text: 'SLA',
        tocHide: false,
        _uid: '2d3e201d-410d-41cb-844e-0eaa3da5cd7b',
      },
      {
        component: 'heading',
        level: 'h4',
        text: 'Burgermeester',
        tocHide: false,
        _uid: '1969d622-3cb5-4260-a3dc-d4b7383bc4f6',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Amstel & Magere Brug',
        tocHide: false,
        _uid: '8a14505d-9acb-4bc6-a1aa-8e574d0bb15a',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Reguliergracht',
        tocHide: false,
        _uid: '799b1737-f1cf-457b-887a-5e7c884dba68',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Ballade sur les canaux',
        tocHide: false,
        _uid: '90fd1aa2-a42e-4f0a-ade9-8669695e32e2',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Les Negen Straatjes',
        tocHide: false,
        _uid: '77fcbff6-ff07-4180-955d-6b9261987894',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Diner chez Spingaren',
        tocHide: false,
        _uid: 'de2f6060-d7c8-458f-919c-cb5348b3b605',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Quartier rouge de nuit',
        tocHide: false,
        _uid: '58ece389-41d2-4463-a5ee-7f40a87dd74f',
      },
      {
        component: 'heading',
        level: 'h3',
        text: 'Retour à Centraal Station — Une nuit dans la ville.',
        tocHide: true,
        _uid: '8b98b7d6-53e8-4222-9f92-ea64bf837bc5',
      },
      {
        component: 'heading',
        level: 'h2',
        text: 'Visiter Amsterdam en 1 jour : des idées supplémentaires',
        tocHide: false,
        _uid: 'e042fae8-7279-4400-a5ea-2d13faab1eea',
      },
      {
        component: 'heading',
        level: 'h2',
        text: 'Visiter Amsterdam en 1 jour : bon à savoir',
        tocHide: false,
        _uid: '21838dac-b991-4800-a398-e54092648747',
      },
    ];

    const items = content.filter(i => i.level === 'h3' && i.tocHide === false);

    const {getAllByTestId} = render(<TableOfContents content={content} />);

    const nestedItems = getAllByTestId('table-of-contents__nested-item');

    expect(nestedItems).toHaveLength(items.length);
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
