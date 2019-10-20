import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import SiteTitle from './SiteTitle';
import {NavigationRoutes, SocialMediasLinks} from '../../constant/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import './activeLinkStyle.scss';

const TopBar = styled.section`
  position: fixed;
  z-index: 9999;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  display: grid;
  grid-template-columns: [title] 1fr [nav] auto [social] 1fr;
  grid-template-rows: 80px;
  grid-column-gap: 50px;
  align-items: center;
  @media only screen and (max-width: 76rem) {
    display: none;
  }
`;

const StyledSiteTitle = styled(SiteTitle)`
  justify-self: end;
`;

const NavItems = styled.nav`
  margin: 0;
  padding: 0;
  list-style: none;
  text-transform: uppercase;
  display: flex;
  flex-flow: row nowrap;
`;

const NavItem = styled(Link)`
  margin: 0 25px;
  text-decoration: none;
  font-size: 16px;
`;

const SocialMedias = styled.div`
  justify-self: start;
  margin: 0 1rem;
  font-size: 1.5rem;
`;

export default class Desktop extends React.Component {
  render() {
    return (
      <TopBar breakingpoint={this.props.breakingpoint}>
        <StyledSiteTitle />
        <nav>
          <NavItems>
            {NavigationRoutes.map(({to, txt}, id) => (
              <NavItem key={id} to={to} activeClassName='header__link--is-active'>
                {txt}
              </NavItem>
            ))}
          </NavItems>
        </nav>
        <SocialMedias>
          <a href={SocialMediasLinks.instagram} aria-label='Instagram'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </SocialMedias>
      </TopBar>
    );
  }

  toggleMenu = () => {
    this.setState(prevStat => ({
      isOpen: !prevStat.isOpen,
    }));
  };
}
