import * as React from 'react';

import styles from './ProfilePage.module.css';

interface IProfilePageProps {
  auth: boolean;
}

interface IProfilePageState {
  isLoading: boolean;
}

export class ProfilePage extends React.PureComponent<IProfilePageProps, IProfilePageState> {

  public render() {
    const {
      auth,
    } = this.props;
    return (
      <div className={styles.Container}>
        HELLO I'M A PROFILE PAGE
      </div>
    );
  }
}