import React from 'react';
import styled from 'styled-components';
import {Link} from 'gatsby';
import {colors, fonts} from '../../constant/style';
import siteMetadata from '../../constant/siteMetadata';

const StyledLink = styled(Link)`
  display: block;
  font-size: 24px;
  color: ${colors.alpha};
  font-family: ${fonts.beta};
  font-weight: 900;
  text-decoration: none;
  justify-self: right;
  white-space: nowrap;
  margin: 0 1rem;
`;

export default ({className}) => {
  return (
    <h1>
      <StyledLink to='/' className={className}>
        {siteMetadata.title}
      </StyledLink>
    </h1>
  );
};
