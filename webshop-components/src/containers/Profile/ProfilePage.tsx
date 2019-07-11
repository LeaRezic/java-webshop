import * as React from 'react';
import classNames from 'classnames';

import styles from './ProfilePage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';
import { createStructuredSelector } from 'reselect';
import { any } from 'prop-types';
import { authTokenSelector } from '../Auth/state/selectors';
import { purchaseHistoryRequest } from './state/actions';
import { connect } from 'react-redux';

interface IProfilePageMappedProps {
  authToken: string;
}

interface IProfilePageMappedDispatch {
  onRequestPurchaseHistory: (token: string) => void;
}

type IProfilePageProps = IProfilePageMappedProps & IProfilePageMappedDispatch;

export class ProfilePageComponent extends React.PureComponent<IProfilePageProps> {

  public render() {
    return (
      <div className={styles.Container}>
        HELLO I'M A PROFILE PAGE
        <button
        onClick={() => this.props.onRequestPurchaseHistory(this.props.authToken)}
          className={classNames(globalStyles.Btn, globalStyles.BtnSuccess)}
        >
          FETCH PURCHASE HISTORY
        </button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IProfilePageMappedProps>({
  authToken: authTokenSelector,
})

const mapDispatchToProps = {
  onRequestPurchaseHistory: purchaseHistoryRequest,
}

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePageComponent);
