import * as React from 'react';

import duckLogo from '../../assets/img/logo.png';

import styles from './Logo.module.css';

export class Logo extends React.Component {
  public render() {
    return(
      <div className={styles.Logo}>
        <img src={duckLogo} alt='Logo Duck' />
      </div>
    );
  }
}