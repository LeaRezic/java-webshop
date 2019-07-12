import * as React from 'react';

import { Aux } from '../../hoc/Aux/Aux';
import { Backdrop } from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

interface IModalProps {
  show: boolean;
  onModalClosed: () => void;
}

export class Modal extends React.Component<IModalProps> {

  public shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
      || nextProps.children !== this.props.children;
  }

  public render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          onClick={this.props.onModalClosed}
        />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0,
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    )
  }
}
