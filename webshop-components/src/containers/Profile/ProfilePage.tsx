import * as React from 'react';
import classNames from 'classnames';

import { createStructuredSelector } from 'reselect';
import { authTokenSelector } from '../Auth/state/selectors';
import { purchaseHistoryRequest } from './state/actions';
import { connect } from 'react-redux';
import { IReceiptDetailed } from './interfaces';
import { receiptsSelector, loadingHistorySelector, historyLoadedSelector } from './state/selectors';
import { PurchaseHistory } from './components/PurchaseHistory/PurchaseHistory';
import { Modal } from '../../components/Modal/Modal';
import { Aux } from '../../hoc/Aux/Aux';
import { ReceiptDetailed } from './components/ReceiptDetailed/ReceiptDetailed';

import styles from './ProfilePage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';

interface IProfilePageMappedProps {
  isLoadingHistory: boolean;
  isHistoryLoaded: boolean;
  authToken: string;
  purchaseHistory: IReceiptDetailed[];
}

interface IProfilePageMappedDispatch {
  onRequestPurchaseHistory: (token: string) => void;
}

interface IProfilePageState {
  shouldDisplayHistory: boolean;
  showPopup: boolean;
  showReceipt?: IReceiptDetailed;
}

type IProfilePageProps = IProfilePageMappedProps & IProfilePageMappedDispatch;

export class ProfilePageComponent extends React.PureComponent<IProfilePageProps, IProfilePageState> {

  public state = {
    shouldDisplayHistory: false,
    showPopup: false,
    showReceipt: null,
  };

  public render() {
    const purchaseHistory =
      <div className={styles.Container}>
        <button
          onClick={this.handleOnClick}
          className={classNames(globalStyles.Btn, globalStyles.BtnSubtle)}
        >
          {this.state.shouldDisplayHistory ? 'REFRESH PURCHASE HISTORY' : 'FETCH PURCHASE HISTORY'}
        </button>
        {this.state.shouldDisplayHistory
          ? <PurchaseHistory
              isLoadingData={this.props.isLoadingHistory}
              isDataLoaded={this.props.isHistoryLoaded}
              onViewItems={this.handleViewItems}
              receipts={this.props.purchaseHistory}
            />
          : null}
      </div>;
    return (
      <Aux>
        {purchaseHistory}
        {this.state.showPopup
          ? <Modal show={this.state.showPopup} onModalClosed={this.handleClosePopup} >
              <ReceiptDetailed receipt={this.state.showReceipt} />
            </Modal>
          : null }
      </Aux>
    );
  }

  private handleClosePopup = () => {
    this.setState({ showPopup: false });
  }

  private handleOnClick = () => {
    this.setState({shouldDisplayHistory: true});
    this.props.onRequestPurchaseHistory(this.props.authToken);
  }

  private handleViewItems = (receipt: IReceiptDetailed) => {
    this.setState({ showPopup: true, showReceipt: receipt });
    console.log(receipt);
  }
}

const mapStateToProps = createStructuredSelector<any, IProfilePageMappedProps>({
  authToken: authTokenSelector,
  purchaseHistory: receiptsSelector,
  isLoadingHistory: loadingHistorySelector,
  isHistoryLoaded: historyLoadedSelector,
})

const mapDispatchToProps = {
  onRequestPurchaseHistory: purchaseHistoryRequest,
}

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePageComponent);
