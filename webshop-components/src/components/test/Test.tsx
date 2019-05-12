import * as React from 'react';

import styles from './Test.module.css';

export class Test extends React.Component {
  render() {
    return(
      <div className={styles['Test']}>
        <div>BLABLABLABLA</div>
      </div>
    );
  }
}
