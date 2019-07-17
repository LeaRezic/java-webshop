import * as React from 'react';
import Select from 'react-dropdown-select';

import { IAdminUserData } from '../../interfaces';

import styles from './UsersSelect.module.css';

export interface IUsersSelect {
  users: IAdminUserData[];
  selectedUsers: IAdminUserData[];
  onChange: (user: string) => void;
}

export class UsersSelect extends React.Component<IUsersSelect> {
  render() {
    return(
      <div className={styles.SelectContainer}>
        <Select
          clearable
          closeOnSelect
          options={this.props.users}
          color={'#CF6766'}
          placeholder={'Select user...'}
          valueField={'username'}
          labelField={'username'}
          values={this.props.selectedUsers}
          onChange={this.handleOnChange}
          onClearAll={() => this.props.onChange(null)}
        />
      </div>
    );
  }

  private handleOnChange = (values) => {
    if (values && values.length !== 0 && values[0].username) {
      this.props.onChange(values[0].username);
    }
    return;
  }
}
