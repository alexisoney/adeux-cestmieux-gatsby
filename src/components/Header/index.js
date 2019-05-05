import React from 'react';
import Mobile from './Mobile';
import Desktop from './Desktop';

export default class Header extends React.Component {
  render() {
    return (
      <>
        <Desktop />
        <Mobile />
      </>
    );
  }
}
