import * as React from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

import { ILoginLog, IAdminUserData, IAdminViewFilter } from '../../interfaces';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loginLogsRequest, loginLogsSetUsernameFilter, loginLogsSetDatesFilter } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import { usersDataSelector } from '../../state/selectors';
import { isFetchingLogsSelector, isLogDataLoadedSelector, filteredLogsSelector, logsFilter } from '../../state/selectors/logsSelectors';
import { UsersSelect } from '../UsersSelect/UsersSelect';
import { Aux } from '../../../../hoc/Aux/Aux';
import ReactTable from 'react-table';
import { columnsConfig } from './tableConfig';
import { NoData } from '../../../../components/UI/NoData/NoData';

import styles from './LoginLogs.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';

interface ILoginLogsMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  logsData: ILoginLog[];
  usersData: IAdminUserData[];
  logsFilter: IAdminViewFilter;
}

interface ILoginLogsMappedDispatch {
  onLogDataFetch: (tokenId: string) => void;
  onSetUsernameFilter: (username: string) => void;
  onSetDatesFilter: (dates: Date[]) => void;
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
              <div className={styles.DatePickerContainer}>
              <div className={globalStyles.CrimzonBigUppercase}>Specify Date Range: </div>
                <DateTimeRangePicker
                  onChange={this.handleDateRangeChange}
                  value={this.getSelectedDates()}
                  className={styles.CustomDatePicker}
                  format={'\xa0\xa0dd.MM.yyyy\xa0HH:MM:ss\xa0\xa0'}
                />
              </div>
              <div className={styles.SelectContainer}>
                <UsersSelect
                  selectedUsers={this.getSelectedUsers()}
                  users={this.props.usersData}
                  onChange={this.props.onSetUsernameFilter}
                />
              </div>
              { this.props.isDataLoaded && this.props.logsData.length === 0
                ? <NoData />
                : <ReactTable
                    columns={columnsConfig}
                    data={this.props.logsData}
                    pageSize={this.props.logsData.length > 10 ? 25 : 5}
                  /> }
            </Aux>
        }
      </div>
    );
  }

  private getSelectedDates = () => {
    return [this.props.logsFilter.from, this.props.logsFilter.to];
  }

  private getSelectedUsers = () => {
    if (this.props.logsFilter.username === null) {
      return [];
    }
    return this.props.usersData.filter((user) => user.username === this.props.logsFilter.username);
  }

  private handleDateRangeChange = (values) => {
    if (values === null) {
      this.props.onSetDatesFilter([null, null]);
      return;
    }
    this.props.onSetDatesFilter(values);
  }
}

const mapStateToProps = createStructuredSelector<any, ILoginLogsMappedProps>({
  tokenId: authTokenSelector,
  isFetchinData: isFetchingLogsSelector,
  isDataLoaded: isLogDataLoadedSelector,
  logsData: filteredLogsSelector,
  usersData: usersDataSelector,
  logsFilter: logsFilter,
});

const mapDispatchToProps = {
  onLogDataFetch: loginLogsRequest,
  onSetUsernameFilter: loginLogsSetUsernameFilter,
  onSetDatesFilter: loginLogsSetDatesFilter,
}

export const LoginLogs = connect(mapStateToProps, mapDispatchToProps)(LoginLogsComponent);
