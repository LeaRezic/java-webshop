import * as React from 'react';

import { getTableConfig } from './tableConfig';
import { IReceiptDetailed } from '../../containers/Profile/interfaces';
import { ReceiptDetailed } from './ReceiptDetailed/ReceiptDetailed';
import { Aux } from '../../hoc/Aux/Aux';
import { Modal } from '../Modal/Modal';

import ReactTable from 'react-table';

interface IReceiptTableProps {
  data: IReceiptDetailed[];
  showUsername: boolean;
}

interface IReceiptTableState {
  showPopup: boolean;
  showReceipt?: IReceiptDetailed;
}

export class ReceiptsTable extends React.PureComponent<IReceiptTableProps, IReceiptTableState> {

  public state = {
    showPopup: false,
    showReceipt: null,
  }

  public render() {
    return(
      <Aux>
        <ReactTable
          columns={getTableConfig(this.props.showUsername, this.handleViewItems)}
          data={this.props.data}
          pageSize={this.props.data.length > 10 ? 20 : 5}
        />
        { this.state.showPopup
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

  private handleViewItems = (receipt: IReceiptDetailed) => {
    this.setState({ showPopup: true, showReceipt: receipt });
  }
}
