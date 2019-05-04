import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {colors} from '../../constant/style';
import SiteTitle from './SiteTitle';
import {NavigationRoutes, SocialMediasLinks} from '../../constant/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import './activeLinkStyle.scss';

const Wrapper = styled.div`
  @media only screen and (min-width: 58.01rem) {
    display: none;
  }
`;

const TopBar = styled.section`
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 80px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const Button = styled.div`
  height: 100%;
  width: 5rem;
  display: flex;
  justify-content: flex-start;
  padding: 0 1rem;
  align-items: center;
  margin: 0;
  font-size: 1.5rem;
  color: ${colors.alpha};
  &:hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  background: white;
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  transform: ${props => (props.open ? 'translateY(0)' : 'translateY(-100%)')};
`;

const NavItems = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

const NavItemInternal = styled(Link)`
  margin: 25px 0;
  text-decoration: none;
`;

const NavItemExternal = styled.a`
  margin: 25px 0;
  text-decoration: none;
`;

export default class Mobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.nav = React.createRef();
  }

  render() {
    return (
      <Wrapper style={{display: this.state.isOpen ? 'flex' : null}}>
        <TopBar>
          <Button onClick={this.toggleMenu}>
            <FontAwesomeIcon icon={this.state.isOpen ? faTimes : faBars} />
          </Button>
          <SiteTitle />
        </TopBar>
        <Nav ref={this.nav} open={this.state.isOpen}>
          <NavItems>
            {NavigationRoutes.map(({to, txt}, id) => (
              <NavItemInternal key={id} to={to} activeClassName='header__link--is-active'>
                {txt}
              </NavItemInternal>
            ))}
            <NavItemExternal
              key='Instagram'
              href={SocialMediasLinks.instagram}
              aria-label='Instagram'
            >
              <FontAwesomeIcon icon={faInstagram} size='2x' />,
            </NavItemExternal>
          </NavItems>
        </Nav>
      </Wrapper>
    );
  }

  toggleMenu = () => {
    if (this.state.isOpen) {
      enableBodyScroll(this.nav.current);
    } else {
      disableBodyScroll(this.nav.current);
    }

    this.setState(prevStat => ({
      isOpen: !prevStat.isOpen,
    }));
  };
}
