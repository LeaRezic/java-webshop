import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { NavItem } from '../NavItem/NavItem';
import { isAuthenticatedSelector, isAdminSelector } from '../../../containers/Auth/state/selectors';
import { IAppAuthMappedProps } from '../../../App';

import styles from './NavItems.module.css';

export class NavItemsComponent extends React.Component<IAppAuthMappedProps> {
  render() {
    const {
      isAdmin,
      isAuth,
    } = this.props;
    return (
      <ul className={styles.NavItems}>
        {!isAdmin ? <NavItem link='/products' exact>Shop</NavItem> : null}
        {isAuth && !isAdmin ? <NavItem link='/checkout'>Checkout</NavItem> : null}
        {isAuth && !isAdmin ? <NavItem link='/profile'>Profile</NavItem> : null}
        {isAdmin ? <NavItem link='/admin'>Admin</NavItem> : null}
        <NavItem link='/auth'>{isAuth ? 'Log out' : 'Log in'}</NavItem>
      </ul>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IAppAuthMappedProps>({
  isAuth: isAuthenticatedSelector,
  isAdmin: isAdminSelector,
})

export const NavItems = connect(mapStateToProps)(NavItemsComponent);