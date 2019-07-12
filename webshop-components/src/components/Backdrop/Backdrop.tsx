import * as React from 'react';

import { Aux } from '../../hoc/Aux/Aux';

import styles from './Backdrop.module.css';

interface IBackdropProps {
  show: boolean;
  onClick: () => void;
}

export class Backdrop extends React.Component<IBackdropProps> {
  public render() {
    return(
      <Aux>
        {this.props.show
          ? <div
              className={styles.Backdrop}
              onClick={this.props.onClick}
            />
          : null}
      </Aux>
    );
  }
}
