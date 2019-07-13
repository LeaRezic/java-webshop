import React from 'react';

import { Logo } from '../../Logo/Logo';
import { NavItems } from '../NavItems/NavItems';
import { Backdrop } from '../../Backdrop/Backdrop';
import { Aux } from '../../../hoc/Aux/Aux';

import styles from './SideDrawer.module.css';

interface ISideDrawer {
  open: boolean;
  onClick: () => void;
}

export class SideDrawer extends React.Component<ISideDrawer> {
  public render() {
    const attachedClasses = [styles.SideDrawer];
    attachedClasses.push(this.props.open ? styles.Open : styles.Close);
    return (
      <Aux>
        <Backdrop
          show={this.props.open}
          onClick={this.props.onClick}
        />
        <div className={attachedClasses.join(' ')} onClick={this.props.onClick}>
          <div className={styles.Logo}>
            <Logo />
          </div>
          <nav className={styles.DesktopOnly}>
            <NavItems />
          </nav>
        </div>
      </Aux>
    );
  }
}
