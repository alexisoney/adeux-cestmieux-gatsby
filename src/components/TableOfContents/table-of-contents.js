import React from 'react';
import propTypes from 'prop-types';

import {createAnchorLink} from '../utils';

const TableOfContents = ({content}) => {
  if (Array.isArray(content)) {
    const headings = content.filter(i => i.component === 'heading');

    if (headings.length === 0) {
      return null;
    }

    let groups = [];
    headings.forEach((item, index) => {
      if (item.level === 'h2' && !item.tocHide) {
        let group = [];
        group.push(item);
        for (let i = index + 1, stop = false; i < headings.length && !stop; i++) {
          if (headings[i].level === 'h3') {
            group.push(headings[i]);
          } else {
            stop = true;
          }
        }
        groups.push(group);
      }
    });

    if (groups.length === 0) {
      return null;
    }

    const render = groups.map(group => {
      const h2 = group[0];
      return (
        <li key={h2._uid} className='table-of-contents__item' data-testid='table-of-contents__item'>
          <a
            className='table-of-contents__link'
            data-testid='table-of-contents__link'
            href={`#${createAnchorLink(h2.tocText || h2.text)}`}
          >
            {h2.tocText || h2.text}
          </a>
          {group.length > 1 && (
            <ul
              className='table-of-contents__nested-items'
              data-testid='table-of-contents__nested-items'
            >
              {group.slice(1).map(h3 =>
                h3.tocHide ? null : (
                  <li
                    className='table-of-contents__nested-item'
                    data-testid='table-of-contents__nested-item'
                    key={h3._uid}
                  >
                    <a
                      className='table-of-contents__nested-link'
                      data-testid='table-of-contents__nested-link'
                      href={`#${createAnchorLink(h3.tocText || h3.text)}`}
                    >
                      {h3.tocText || h3.text}
                    </a>
                  </li>
                )
              )}
            </ul>
          )}
        </li>
      );
    });

    return (
      <div data-testid='table-of-contents' className='table-of-contents'>
        <p className='table-of-contents__title' data-testid='table-of-contents__title'>
          Au sommaire :
        </p>
        <ul className='table-of-contents__list'>{render}</ul>
      </div>
    );
  }

  return null;
};

TableOfContents.propTypes = {
  content: propTypes.array,
};

export default TableOfContents;
