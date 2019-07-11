import * as React from 'react';
import classNames from 'classnames';

import { UserForm } from './components/UserForm/UserForm';
import { IUserRequestInfo, loginRequest, registerRequest, logOut, stopRedirectToProducts } from './state/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector, shouldRedirectSelector } from './state/selectors';

import styles from './LoginPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';
import { ReactRouterProps } from '../../types/interfaces';

interface ILoginPageMappedProps {
  isAuthenticated: boolean;
  shouldRedirect: boolean;
}

interface ILoginPageMappedDispatch {
  onLogin: (data: IUserRequestInfo) => void;
  onRegister: (data: IUserRequestInfo) => void;
  onLogout: () => void;
  onCancelRedirect: () => void;
}

type ILoginPageProps = ILoginPageMappedProps
  & ILoginPageMappedDispatch
  & ReactRouterProps;

interface ILoginPageState {
  isLoading: boolean;
}

export class LoginPageComponent extends React.PureComponent<ILoginPageProps, ILoginPageState> {

  public componentDidUpdate() {
    if (this.props.shouldRedirect) {
      this.props.onCancelRedirect();
      this.props.history.push('/products');
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
                    <div className={globalStyles.TextPurpleLightBig}>COME BACK SOON</div>
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
})

const mapDispatchToProps = {
  onLogin: loginRequest,
  onRegister: registerRequest,
  onLogout: logOut,
  onCancelRedirect: stopRedirectToProducts,
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);
