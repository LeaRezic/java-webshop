import * as React from 'react';

import styles from './AdminPage.module.css';

interface IAdminPageProps {
  auth: boolean;
}

interface IAdminPageState {
  isLoading: boolean;
}

export class AdminPage extends React.PureComponent<IAdminPageProps, IAdminPageState> {

  public render() {
    const {
      auth,
    } = this.props;
    return (
      <div className={styles.Container}>
        HELLO I'M AN ADMIN PAGE
      </div>
    );
  }
}