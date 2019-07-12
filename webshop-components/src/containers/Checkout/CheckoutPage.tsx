import * as React from 'react';

import styles from './CheckoutPage.module.css';

interface ICheckoutPageProps {
  auth: boolean;
}

interface ICheckoutPageState {
  isLoading: boolean;
}

export class CheckoutPage extends React.PureComponent<ICheckoutPageProps, ICheckoutPageState> {

  public render() {
    const {
      auth,
    } = this.props;
    return (
      <div className={styles.Container}>
        HELLO I'M A CHECKOUT PAGE
      </div>
    );
  }
}
