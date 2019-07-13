import * as React from 'react';
import classNames from 'classnames';
import { notify } from 'react-notify-toast';

import { UserForm } from './components/UserForm/UserForm';
import { IUserRequestInfo, loginRequest, registerRequest, logOut, stopRedirectToProducts, clearLoginError, clearRegisterError } from './state/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector, shouldRedirectSelector, loginErrorSelector, registerErrorSelector } from './state/selectors';

import styles from './LoginPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';
import { ReactRouterProps } from '../../typings/interfaces';

interface ILoginPageMappedProps {
  isAuthenticated: boolean;
  shouldRedirect: boolean;
  loginError: string;
  registerError: string;
}

interface ILoginPageMappedDispatch {
  onLogin: (data: IUserRequestInfo) => void;
  onRegister: (data: IUserRequestInfo) => void;
  onLogout: () => void;
  onCancelRedirect: () => void;
  onClearLoginError: () => void;
  onClearRegisterError: () => void;
}

type ILoginPageProps = ILoginPageMappedProps
  & ILoginPageMappedDispatch
  & ReactRouterProps;

interface ILoginPageState {
  isLoading: boolean;
}

export class LoginPageComponent extends React.PureComponent<ILoginPageProps, ILoginPageState> {

  show;
  constructor(props) {
    super(props);
    this.show = notify.createShowQueue();
  }

  public componentDidUpdate() {
    if (this.props.shouldRedirect) {
      this.props.onCancelRedirect();
      this.props.history.push('/products');
    }

    if (this.props.loginError) {
      this.show(this.props.loginError, 'error', 4000);
      this.props.onClearLoginError();
    }
    if (this.props.registerError) {
      this.show(this.props.registerError, 'error', 4000);
      this.props.onClearRegisterError();
    }
  }

  public render() {
    return (
      <div className={styles.BackgroundContainer}>
        <div className={styles.ContentContainer}>
          <div className={styles.BigDuckImg} />
          <div className={styles.LoginContainer}>
            {
              this.props.isAuthenticated
              ? (
                  <div>
                    <div className={globalStyles.CrimzonBigUppercase}>COME BACK SOON</div>
                    <button
                      onClick={(e) => this.handleLogout(e)}
                      className={classNames(globalStyles.Btn, globalStyles.BtnSubtle, styles.LogOutBtn)}
                    >
                      LOG OUT FOR REAL
                    </button>
                  </div>
                )
              : (
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
              )
            }
          </div>
        </div>
      </div>
    );
  }

  private handleLogout = (e: any) => {
    e.preventDefault();
    this.props.onLogout();
  }
}

const mapStateToProps = createStructuredSelector<any, ILoginPageMappedProps>({
  isAuthenticated: isAuthenticatedSelector,
  shouldRedirect: shouldRedirectSelector,
  loginError: loginErrorSelector,
  registerError: registerErrorSelector,
});

const mapDispatchToProps = {
  onLogin: loginRequest,
  onRegister: registerRequest,
  onLogout: logOut,
  onCancelRedirect: stopRedirectToProducts,
  onClearLoginError: clearLoginError,
  onClearRegisterError: clearRegisterError,
};

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);
