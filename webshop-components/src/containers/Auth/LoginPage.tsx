import * as React from 'react';

import styles from './LoginPage.module.css';

interface ILoginPageProps {
  auth: boolean;
}

interface ILoginPageState {
  isLoading: boolean;
}

export class LoginPage extends React.PureComponent<ILoginPageProps, ILoginPageState> {

  public render() {
    const {
      auth,
    } = this.props;
    return (
      <div className={styles.Container}>
        HELLO I'M A LOGIN PAGE
      </div>
    );
  }
}