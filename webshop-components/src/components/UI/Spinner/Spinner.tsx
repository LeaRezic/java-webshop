import * as React from 'react';

import styles from './Spinner.module.css';

export class Spinner extends React.Component {
  public render() {
    return(
      <div className={styles['loader']}/>
    );
  }
}