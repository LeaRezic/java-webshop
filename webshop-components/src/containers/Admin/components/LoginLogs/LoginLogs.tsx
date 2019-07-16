import * as React from 'react';
import { ILoginLog } from '../../interfaces';

import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { Table } from '../../../../components/Table/Table';
import { getTableConfig } from './tableConfig';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loginLogsRequest } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import { isFetchingLogsSelector, isLogDataLoadedSelector, logDataSelector } from '../../state/selectors';

import styles from './LoginLogs.module.css';

interface ILoginLogsMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  data: ILoginLog[];
}

interface ILoginLogsMappedDispatch {
  onLogDataFetch: (tokenId: string) => void;
}

type ILoginLogsProps = ILoginLogsMappedProps & ILoginLogsMappedDispatch;

export class LoginLogsComponent extends React.PureComponent<ILoginLogsProps> {

  public componentDidMount() {
    if (this.props.data === null || this.props.data.length === 0) {
      this.props.onLogDataFetch(this.props.tokenId);
    }
  }

  public render() {
    return (
      <div className={styles.TableContainer}>
        {this.props.isFetchinData
          ? <Spinner />
          : this.props.isDataLoaded && this.props.data.length === 0
            ? <p>NO DATA TO SHOW</p>
            : <Table
                columns={getTableConfig()}
                data={this.props.data}
                foldableColumns={true}
              />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, ILoginLogsMappedProps>({
  tokenId: authTokenSelector,
  isFetchinData: isFetchingLogsSelector,
  isDataLoaded: isLogDataLoadedSelector,
  data: logDataSelector,
});

const mapDispatchToProps = {
  onLogDataFetch: loginLogsRequest,
}

export const LoginLogs = connect(mapStateToProps, mapDispatchToProps)(LoginLogsComponent);
