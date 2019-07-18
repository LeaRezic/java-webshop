import * as React from 'react';

import styles from './Footer.module.css';

export class Footer extends React.Component {
  public render() {
    return(
      <div className={styles.Container} >
        <div className={styles.Content}>
          <div>2019 - Rubber Duck Boardgames&copy; - superduper fictional webshop created for educationl purposes.
          Awesome duck icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> are licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
          </div>
        </div>
      </div>
    );
  }
}