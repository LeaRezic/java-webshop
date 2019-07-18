import React from 'react';
import classNames from 'classnames';

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
    const dinamicClass = this.props.open ? styles.Open : styles.Close;
    return (
      <Aux>
        <Backdrop
          show={this.props.open}
          onClick={this.props.onClick}
        />
        <div className={classNames(styles.SideDrawer, dinamicClass)} onClick={this.props.onClick}>
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
