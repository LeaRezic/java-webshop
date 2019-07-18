import * as React from 'react';
import { connect } from 'react-redux';

import styles from './AdminPage.module.css';
import { AdminViewType } from './interfaces';
import { AdminViewSelect } from './components/AdminViewSelect/AdminViewSelect';
import { createStructuredSelector } from 'reselect';
import { setAdminView } from './state/actions';
import { adminViewSelector } from './state/selectors';
import { UsersData } from './components/UsersData/UsersData';
import { Receipts } from './components/Receipts/Receipts';
import { LoginLogs } from './components/LoginLogs/LoginLogs';

const VIEWS = [
  AdminViewType.VIEW_USERS,
  AdminViewType.VIEW_LOGS,
  AdminViewType.VIEW_RECEIPTS,
];

interface IAdminMappedProps {
  selectedView: AdminViewType;
}

interface IAdminMappedDispatch {
  onSelectAdminView: (view: AdminViewType) => void;
}

type IAdminPageProps = IAdminMappedProps & IAdminMappedDispatch;

interface IAdminPageState {
  isLoading: boolean;
}

class AdminPageComponent extends React.PureComponent<IAdminPageProps, IAdminPageState> {
  public render() {
    const {
      selectedView,
      onSelectAdminView,
    } = this.props;
    let render = null;
    switch (selectedView) {
      case AdminViewType.VIEW_LOGS:
        render = <LoginLogs />;
        break;
      case AdminViewType.VIEW_RECEIPTS:
        render = <Receipts />;
        break;
      default:
        render = <UsersData />;
        break;
    }
    return (
      <div className={styles.Container}>
        <AdminViewSelect
          views={VIEWS}
          selectedView={selectedView}
          onSelect={onSelectAdminView}
        />
        <div className={styles.TableContainer}>
          {render}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IAdminMappedProps>({
  selectedView: adminViewSelector,
});

const mapDispatchToProps = {
  onSelectAdminView: setAdminView,
}

export const AdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPageComponent);
