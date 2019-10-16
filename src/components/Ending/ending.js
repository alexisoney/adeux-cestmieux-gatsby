import React from 'react';
import styled from 'styled-components';

import {colors} from '../../constant/style';

const Ending = styled.p`
  margin: 8em 0 4em;
  font-size: 0.75em;
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  &::before {
    content: '';
    display: block;
    margin: 0 auto 1em;
    height: 0.2em;
    width: 4em;
    background-color: ${colors.gamma};
  }
`;

export default () => <Ending>End of Story</Ending>;
