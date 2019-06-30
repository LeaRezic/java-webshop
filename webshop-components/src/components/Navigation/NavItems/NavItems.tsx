import React from 'react';

import { NavItem } from '../NavItem/NavItem';

import styles from './NavItems.module.css';

export class NavItems extends React.Component {
  render() {
    return (
      <ul className={styles.NavItems}>
        <NavItem link='/products' exact>Shop</NavItem>
        <NavItem link='/profile'>Profile</NavItem>
        <NavItem link='/checkout'>Checkout</NavItem>
        <NavItem link='/auth'>Log in</NavItem>
        <NavItem link='/admin'>Admin</NavItem>
      </ul>
    );
  }
}
