import * as React from 'react';
import { IAdminUserData } from '../../interfaces';

import styles from './UsersData.module.css';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { Table } from '../../../../components/Table/Table';
import { getTableConfig } from './tableConfig';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { usersDataRequest, viewUserLogs, viewUserReceipts } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import { isFetchingUserDataSelector, usersDataSelector, isUsersDataLoadedSelector } from '../../state/selectors';

interface IUsersDataMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  data: IAdminUserData[];
}

interface IUsersDataMappedDispatch {
  onUsersDataFetch: (tokenId: string) => void;
  onClickUserLogs: (username: string) => void;
  onClickUserReceipts: (username: string) => void;
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
              ? <p>NO DATA TO SHOW</p>
              : <Table
                  columns={getTableConfig(this.props.onClickUserLogs, this.props.onClickUserReceipts)}
                  data={this.props.data}
                  foldableColumns={true}
                />
        }
      </div>
    );
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
  onClickUserLogs: viewUserLogs,
  onClickUserReceipts: viewUserReceipts,
}

export const UsersData = connect(mapStateToProps, mapDispatchToProps)(UsersDataComponent);
