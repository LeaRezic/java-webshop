import * as React from 'react';
import classNames from 'classnames';

import { IUserRequestInfo } from '../../state/actions';
import { IInputField, INPUT_TYPE, InputField } from '../../../../components/Input/Input';

import styles from './UserForm.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';

const EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

interface IUserFormProps {
  formTitle: string;
  btnText: string;
  onSubmit: (data: IUserRequestInfo) => void;
}

interface IInputProp {
  value: string;
  touched: boolean;
  valid: boolean;
  error: string;
}

interface IUserFormState {
  username: IInputProp;
  password: IInputProp;
}

const initialInputProps: IInputProp = {
  value: null,
  touched: false,
  valid: false,
  error: null,
};

export class UserForm extends React.PureComponent<IUserFormProps, IUserFormState> {

  public state = {
    username: { ...initialInputProps },
    password: { ...initialInputProps },
  }

  public render() {
    return(
      <form>
        <div className={styles.Container}>
          <span className={globalStyles.CrimzonBigUppercase}>{this.props.formTitle}</span>
          <input
            placeholder='e-mail'
            className={styles.InputField}
            type='email'
            onChange={(event) => this.handleUsernameChange(event)}
          />
          { this.state.username.error !== null
              ? <p className={styles.ErrorText}>{this.state.username.error}</p>
              : null }
          <input
            placeholder='password'
            className={styles.InputField}
            type='password'
            onChange={(event) => this.handlePasswordChange(event)}
          />
          { this.state.password.error !== null
            ? <p className={styles.ErrorText}>{this.state.password.error}</p>
            : null }
          <button
            disabled={this.checkIfSubmitDisabled()}
            onClick={(e) => this.handleSubmit(e)}
            className={classNames(globalStyles.Btn, globalStyles.BtnSuccessSubtle, styles.BtnSubmit)}
          >
            {this.props.btnText}
          </button>
        </div>
      </form>
    );
  }

  private handleUsernameChange = (event) => {
    this.setState({
      username: {
        ...this.state.username,
        touched: true
      }});
    const value = event.target.value;
    if (value === null || value.trim().length === 0) {
      this.setState({
        username: {
          ...this.state.username,
          valid: false,
          error: 'Username cannot be empty.',
        }});
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      this.setState({
        username: {
          ...this.state.username,
          valid: false,
          error: 'Username must be a valid e-mail address.',
        }});
      return;
    }
    this.setState({
      username:{
        ...this.state.username,
        value: value,
        valid: true,
        error: null,
      }});
  };

  private handlePasswordChange = (event) => {
    this.setState({
      password: {
        ...this.state.password,
        touched: true
      }});
    const value = event.target.value;
    if (value === null || value.trim().length === 0) {
      this.setState({
        password: {
          ...this.state.password,
          valid: false,
          error: 'Password cannot be empty.',
        }});
      return;
    }
    if (value.length < 6) {
      this.setState({
        password: {
          ...this.state.password,
          valid: false,
          error: 'Password must be at least 6 characters long.',
        }});
      return;
    }
    this.setState({
      password: {
        ...this.state.password,
        value: value,
        valid: true,
        error: null,
      }});
  }

  private checkIfSubmitDisabled = () => {
    return !this.state.password.valid || !this.state.username.valid;
  }

  // bruddochm@bloglines.com', 'kxSh3kdlc'
  // 'ulundono@opera.com', 'rScnwDFxvqk',
  private handleSubmit = (e: any) => {
    e.preventDefault();
    const userData: IUserRequestInfo = {
      username: this.state.username.value,
      password: this.state.password.value,
    };
    this.props.onSubmit(userData);
  }
}
