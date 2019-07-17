import * as React from 'react';
import { ILoginLog, IAdminUserData } from '../../interfaces';

import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { LogsTable } from './LogsTable/LogsTable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loginLogsRequest, loginLogsSetFilter } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import {
  isFetchingLogsSelector,
  isLogDataLoadedSelector,
  logDataSelector,
  usersDataSelector,
  logsSelectedUsersSelector,
} from '../../state/selectors';
import { UsersSelect } from '../UsersSelect/UsersSelect';

import styles from './LoginLogs.module.css';
import { Aux } from '../../../../hoc/Aux/Aux';

interface ILoginLogsMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  logsData: ILoginLog[];
  usersData: IAdminUserData[];
  selectedUsers: IAdminUserData[];
}

interface ILoginLogsMappedDispatch {
  onLogDataFetch: (tokenId: string) => void;
  onSetFilter: (username: string) => void;
}

type ILoginLogsProps = ILoginLogsMappedProps & ILoginLogsMappedDispatch;

export class LoginLogsComponent extends React.Component<ILoginLogsProps> {

  public componentDidMount() {
    if (this.props.logsData === null || this.props.logsData.length === 0) {
      this.props.onLogDataFetch(this.props.tokenId);
    }
  }

  public render() {
    return (
      <div className={styles.TableContainer}>
        { this.props.isFetchinData
          ? <Spinner />
          : <Aux>
              <UsersSelect
                selectedUsers={this.props.selectedUsers}
                users={this.props.usersData}
                onChange={this.props.onSetFilter}
              />
              { this.props.isDataLoaded && this.props.logsData.length === 0
                ? <p>NO DATA</p>
                : <LogsTable
                    data={this.props.logsData}
                  /> }
            </Aux>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, ILoginLogsMappedProps>({
  tokenId: authTokenSelector,
  isFetchinData: isFetchingLogsSelector,
  isDataLoaded: isLogDataLoadedSelector,
  logsData: logDataSelector,
  usersData: usersDataSelector,
  selectedUsers: logsSelectedUsersSelector,
});

const mapDispatchToProps = {
  onLogDataFetch: loginLogsRequest,
  onSetFilter: loginLogsSetFilter,
}

export const LoginLogs = connect(mapStateToProps, mapDispatchToProps)(LoginLogsComponent);
