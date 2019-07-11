import * as React from 'react';
import classNames from 'classnames';

import styles from './UserForm.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';
import { IUserRequestInfo } from '../../state/actions';

export interface IUserFormProps {
  formTitle: string;
  btnText: string;
  onSubmit: (data: IUserRequestInfo) => void;
}

export class UserForm extends React.PureComponent<IUserFormProps> {
  public render() {
    return(
      <form>
        <div className={styles.Container}>
          <span className={globalStyles.TextPurpleLightBig}>{this.props.formTitle}</span>
          <input placeholder='e-mail' className={styles.InputField} type='email'/>
          <input placeholder='password' className={styles.InputField} type='password' />
          <button
            onClick={(e) => this.handleSubmit(e)}
            className={classNames(globalStyles.Btn, globalStyles.BtnSubtle)}
          >{this.props.btnText}</button>
        </div>
      </form>
    );
  }

  private handleSubmit = (e: any) => {
    e.preventDefault();
    const userData: IUserRequestInfo = {
      username: 'ulundono@opera.com',
      password: 'rScnwDFxvqk',
    }
    this.props.onSubmit(userData);
  }
}