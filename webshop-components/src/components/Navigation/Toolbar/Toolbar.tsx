import * as React from 'react';

import styles from './Toolbar.module.css';
import { Logo } from '../../Logo/Logo';

export class Toolbar extends React.Component {
  public render() {
    return(
      <header className={styles['Toolbar']}>
        {/* drawer toggle */}
        <div className={styles['Logo']}>
          <Logo />
        </div>
        <nav className={styles['DesktopOnly']}>
          Nav items
        </nav>
      </header>
    );
  }
}