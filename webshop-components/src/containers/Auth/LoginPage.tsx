import * as React from 'react';

import { UserForm } from './components/UserForm/UserForm';

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
      <div className={styles.BackgroundContainer}>
        <div className={styles.ContentContainer}>
          <div className={styles.BigDuckImg} />
          <div className={styles.LoginContainer}>
            <div className={styles.WelcomeText}>WELCOME TO RUBBER DUCK BOARDGAMES</div>
            <div>
              <UserForm
                formTitle='Already Have an Account'
                btnText='LOG IN'
              />
              <UserForm
                formTitle='Create a New Account'
                btnText='REGISTER'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}