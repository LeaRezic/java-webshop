import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.css';

interface INavItemProps {
  link: string;
  exact?: boolean;
}

export class NavItem extends React.Component<INavItemProps> {
  render() {
    const {
      link,
      exact
    } = this.props;
    return (
      <li className={styles.NavItem}>
        <NavLink to={link} activeClassName={styles.active} exact={exact}>
          {this.props.children}
        </NavLink>
      </li>
    );
  }
}
