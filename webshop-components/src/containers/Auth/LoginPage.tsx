import * as React from 'react';
import classNames from 'classnames';
import { notify } from 'react-notify-toast';

import { UserForm } from './components/UserForm/UserForm';
import { IUserRequestInfo, authRequest, logOut, stopRedirectToProducts, clearError } from './state/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector, shouldRedirectSelector, authErrorSelector, redirectDestSelector } from './state/selectors';

import styles from './LoginPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';
import { ReactRouterProps } from '../../typings/interfaces';

interface ILoginPageMappedProps {
  isAuthenticated: boolean;
  shouldRedirect: boolean;
  redirectTo: string;
  authError: string;
}

interface ILoginPageMappedDispatch {
  onAuth: (data: IUserRequestInfo) => void;
  onLogout: () => void;
  onCancelRedirect: () => void;
  onClearError: () => void;
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
    if (this.props.authError) {
      this.show(this.props.authError, 'error', 4000);
      this.props.onClearError();
    }
    if (this.props.shouldRedirect) {
      this.props.onCancelRedirect();
      this.props.history.push(this.props.redirectTo);
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
                      isRegister={false}
                      extraValidate={false}
                      onSubmit={this.props.onAuth}
                    />
                    <UserForm
                      formTitle='Create a New Account'
                      btnText='REGISTER'
                      isRegister
                      extraValidate
                      onSubmit={this.props.onAuth}
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
  authError: authErrorSelector,
  redirectTo: redirectDestSelector,
});

const mapDispatchToProps = {
  onAuth: authRequest,
  onLogout: logOut,
  onCancelRedirect: stopRedirectToProducts,
  onClearError: clearError,
};

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);
