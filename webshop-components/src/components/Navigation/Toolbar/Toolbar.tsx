import * as React from 'react';

import styles from './Toolbar.module.css';
import { Logo } from '../../Logo/Logo';
import { NavItems } from '../NavItems/NavItems';
import { DrawerToggle } from '../DrawerToggle/DrawerToggle';

interface IToolbarProps {
  onDrawerTogglerClick: () => void;
}

export class Toolbar extends React.Component<IToolbarProps> {
  public render() {
    return(
      <header className={styles.Toolbar}>
        <DrawerToggle onClick={this.props.onDrawerTogglerClick} />
        <div className={styles.TitleContainer}>
          <div className={styles.Logo}>
            <Logo />
          </div>
          <span className={styles.Title}>RUBBER DUCK BOARDGAMES</span>
        </div>
        <nav className={styles.DesktopOnly}>
          <NavItems/>
        </nav>
      </header>
    );
  }
}
