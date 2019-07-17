import * as React from 'react';
import { IAdminUserData, AdminViewType } from '../../interfaces';

import styles from './UsersData.module.css';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { getTableConfig } from './tableConfig';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { usersDataRequest, loginLogsSetFilter, receiptsSetFilter, setAdminView } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import { isFetchingUserDataSelector, usersDataSelector, isUsersDataLoadedSelector } from '../../state/selectors';
import ReactTable from 'react-table';
import { NoData } from '../../../../components/UI/NoData/NoData';

interface IUsersDataMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  data: IAdminUserData[];
}

interface IUsersDataMappedDispatch {
  onUsersDataFetch: (tokenId: string) => void;
  onSetLogsFilter: (username: string) => void;
  onSetReceiptsFilter: (username: string) => void;
  onChangeView: (adminView: AdminViewType) => void;
}

type IUsersDataProps = IUsersDataMappedProps & IUsersDataMappedDispatch;

export class UsersDataComponent extends React.PureComponent<IUsersDataProps> {

  public componentDidMount() {
    if (this.props.data === null || this.props.data.length === 0) {
      this.props.onUsersDataFetch(this.props.tokenId);
    }
  }

  public render() {
    return(
      <div className={styles.TableContainer}>
        { this.props.isFetchinData
            ? <Spinner />
            : this.props.isDataLoaded && this.props.data.length === 0
              ? <NoData />
              : <ReactTable
                  columns={getTableConfig(this.handleUserLogsClick, this.handleReceiptLogsClick)}
                  data={this.props.data}
                />
        }
      </div>
    );
  }

  private handleUserLogsClick = (username: string) => {
    this.props.onChangeView(AdminViewType.VIEW_LOGS);
    this.props.onSetLogsFilter(username);
  }

  private handleReceiptLogsClick = (username: string) => {
    this.props.onChangeView(AdminViewType.VIEW_RECEIPTS);
    this.props.onSetReceiptsFilter(username);
  }
}

const mapStateToProps = createStructuredSelector<any, IUsersDataMappedProps>({
  tokenId: authTokenSelector,
  isFetchinData: isFetchingUserDataSelector,
  isDataLoaded: isUsersDataLoadedSelector,
  data: usersDataSelector,
});

const mapDispatchToProps = {
  onUsersDataFetch: usersDataRequest,
  onSetLogsFilter: loginLogsSetFilter,
  onSetReceiptsFilter: receiptsSetFilter,
  onChangeView: setAdminView,
}

export const UsersData = connect(mapStateToProps, mapDispatchToProps)(UsersDataComponent);
