import * as React from 'react';
import { columnsConfig } from './tableConfig';
import { ILoginLog } from '../../../interfaces';
import ReactTable from 'react-table';

interface ILogsTableProps {
  data: ILoginLog[];
}

export class LogsTable extends React.Component<ILogsTableProps> {
  public render() {
    return(
      <ReactTable
        columns={columnsConfig}
        // columns={[
        //   {},
        // ]}
        data={this.props.data}
        pageSize={this.props.data.length > 10 ? 20 : 5}
      />
    );
  }
}
