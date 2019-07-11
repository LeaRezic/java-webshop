import * as React from 'react';

import { UserForm } from './components/UserForm/UserForm';

import styles from './LoginPage.module.css';
import { IUserRequestInfo, loginRequest, registerRequest } from './state/actions';
import { connect } from 'react-redux';

interface ILoginPageProps {
  onLogin: (data: IUserRequestInfo) => void;
  onRegister: (data: IUserRequestInfo) => void;
}

interface ILoginPageState {
  isLoading: boolean;
}

export class LoginPageComponent extends React.PureComponent<ILoginPageProps, ILoginPageState> {
  public render() {
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
                onSubmit={this.props.onLogin}
              />
              <UserForm
                formTitle='Create a New Account'
                btnText='REGISTER'
                onSubmit={this.props.onRegister}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onLogin: loginRequest,
  onRegister: registerRequest,
}

export const LoginPage = connect(null, mapDispatchToProps)(LoginPageComponent);
