import * as React from 'react';

import styles from './NoData.module.css';

export interface INoData {
  message?: string;
}

export class NoData extends React.PureComponent<INoData> {

  public render() {
    const message = this.props.message || 'NO DATA';
    return (
      <div className={styles.Container}>
        <div className={styles.Duck} />
        <div className={styles.Message}>{message}</div>
      </div>
    );
  }
}
