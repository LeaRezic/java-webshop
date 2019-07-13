import React from 'react';

import styles from './DrawerToggle.module.css';

interface IDrawerToggleProps {
  onClick: () => void;
}

export class DrawerToggle extends React.Component<IDrawerToggleProps> {
  public render() {
    return (
      <div
        onClick={this.props.onClick}
        className={styles.DrawerToggle}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
