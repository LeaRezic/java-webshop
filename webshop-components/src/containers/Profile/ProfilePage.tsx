import * as React from 'react';
import classNames from 'classnames';

import { createStructuredSelector } from 'reselect';
import { authTokenSelector } from '../Auth/state/selectors';
import { purchaseHistoryRequest } from './state/actions';
import { connect } from 'react-redux';
import { IReceiptDetailed } from './interfaces';
import {
  receiptsSelector,
  isFetchingSelector,
  dataLoadedSelector,
  errorSelector,
} from './state/selectors';
import { PurchaseHistory } from './components/PurchaseHistory/PurchaseHistory';
import { IStore } from '../../state/store';

import styles from './ProfilePage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';

interface IProfilePageMappedProps {
  isFetchingData: boolean;
  dataLoaded: boolean;
  authToken: string;
  purchaseHistory: IReceiptDetailed[];
  error: string;
}

interface IProfilePageMappedDispatch {
  onRequestPurchaseHistory: (token: string) => void;
}

interface IProfilePageState {
  shouldDisplayHistory: boolean;
}

type IProfilePageProps = IProfilePageMappedProps & IProfilePageMappedDispatch;

export class ProfilePageComponent extends React.PureComponent<IProfilePageProps, IProfilePageState> {

  public state = {
    shouldDisplayHistory: false,
  };

  public render() {
    return (
      <div className={styles.Container}>
        <button
          onClick={this.handleOnClick}
          className={classNames(globalStyles.Btn, globalStyles.BtnSubtle)}
        >
          {this.state.shouldDisplayHistory ? 'REFRESH PURCHASE HISTORY' : 'FETCH PURCHASE HISTORY'}
        </button>
        { this.state.shouldDisplayHistory
            ? <PurchaseHistory
                isLoadingData={this.props.isFetchingData}
                isDataLoaded={this.props.dataLoaded}
                receipts={this.props.purchaseHistory}
                error={this.props.error}
              />
            : null }
      </div>
    );
  }

  private handleOnClick = () => {
    this.setState({shouldDisplayHistory: true});
    this.props.onRequestPurchaseHistory(this.props.authToken);
  }

}

const mapStateToProps = createStructuredSelector<IStore, IProfilePageMappedProps>({
  authToken: authTokenSelector,
  purchaseHistory: receiptsSelector,
  isFetchingData: isFetchingSelector,
  dataLoaded: dataLoadedSelector,
  error: errorSelector,
})

const mapDispatchToProps = {
  onRequestPurchaseHistory: purchaseHistoryRequest,
}

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePageComponent);
