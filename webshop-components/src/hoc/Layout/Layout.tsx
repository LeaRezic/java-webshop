import * as React from 'react';

import { Aux } from '../Aux/Aux';

import styles from './Layout.module.css';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';

export class Layout extends React.Component {
  render() {
    return(
      <Aux>
        <Toolbar/>
        <main className={styles['Content']}>{this.props.children}</main>
      </Aux>
    );
  }
}