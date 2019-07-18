import * as React from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { receiptsRequest, receiptsSetUsernameFilter, receiptsSetDatesFilter } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import { usersDataSelector } from '../../state/selectors';
import { isFetchingReceiptsSelector, isReceiptsDataLoadedSelector, filteredReceiptsSelector, receiptsSelectedUsersSelector, receiptsFilterSelector } from '../../state/selectors/receiptSelectors';
import { ReceiptsTable } from '../../../../components/ReceiptsTable/ReceiptsTable';
import { IReceiptDetailed } from '../../../Profile/interfaces';
import { Aux } from '../../../../hoc/Aux/Aux';
import { UsersSelect } from '../UsersSelect/UsersSelect';
import { IAdminUserData, IAdminViewFilter } from '../../interfaces';
import { NoData } from '../../../../components/UI/NoData/NoData';

import styles from './Receipts.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';

interface IReceiptsMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  receiptsData: IReceiptDetailed[];
  usersData: IAdminUserData[];
  receiptsFilter: IAdminViewFilter;
}

interface IReceiptsMappedDispatch {
  onReceiptsDataFetch: (tokenId: string) => void;
  onChangeReceiptUsername: (username: string) => void;
  onSetUsernameFilter: (username: string) => void;
  onSetDatesFilter: (dates: Date[]) => void;
}

type IUsersDataProps = IReceiptsMappedProps & IReceiptsMappedDispatch;

export class ReceiptsComponent extends React.PureComponent<IUsersDataProps> {

  public componentDidMount() {
    if (!this.props.receiptsData.length || this.props.receiptsData.length === 0) {
      this.props.onReceiptsDataFetch(this.props.tokenId);
    }
  }

  public render() {
    return (
      <div className={styles.TableContainer}>
        {this.props.isFetchinData
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
            {this.props.isDataLoaded && this.props.receiptsData.length === 0
              ? <NoData />
              : <ReceiptsTable
                  data={this.props.receiptsData}
                  showUsername={true}
                />}
          </Aux>
        }
      </div>
    );
  }

  private getSelectedDates = () => {
    return [this.props.receiptsFilter.from, this.props.receiptsFilter.to];
  }

  private getSelectedUsers = () => {
    if (this.props.receiptsFilter.username === null) {
      return [];
    }
    return this.props.usersData.filter((user) => user.username === this.props.receiptsFilter.username);
  }

  private handleDateRangeChange = (values) => {
    if (values === null) {
      this.props.onSetDatesFilter([null, null]);
      return;
    }
    this.props.onSetDatesFilter(values);
  }
}

const mapStateToProps = createStructuredSelector<any, IReceiptsMappedProps>({
  tokenId: authTokenSelector,
  isFetchinData: isFetchingReceiptsSelector,
  isDataLoaded: isReceiptsDataLoadedSelector,
  receiptsData: filteredReceiptsSelector,
  usersData: usersDataSelector,
  receiptsFilter: receiptsFilterSelector,
});

const mapDispatchToProps = {
  onReceiptsDataFetch: receiptsRequest,
  onChangeReceiptUsername: receiptsSetUsernameFilter,
  onSetUsernameFilter: receiptsSetUsernameFilter,
  onSetDatesFilter: receiptsSetDatesFilter,
}

export const Receipts = connect(mapStateToProps, mapDispatchToProps)(ReceiptsComponent);
