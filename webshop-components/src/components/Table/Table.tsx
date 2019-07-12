import * as _ from 'lodash-es';
import * as React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import classNames from 'classnames';

import { DetailRow } from './DetailRow/DetailRow';
import { Expander } from './Expander';
import {
  getColumnId,
  transformConfig,
} from './config';
import {
  DEFAULT_COLUMN_WEIGHT,
  DEFAULT_EXPANDER_WIDTH,
  DEFAULT_MIN_COLUMN_WIDTH,
  DEFAULT_MIN_TABLE_WIDTH,
  DEFAULT_PAGE_SIZE,
  DEFAULT_RESIZE_HANDLE_THROTTLE,
} from './constants';
import {
  IGetRowState,
  IRowConfig,
  IRowInfo,
} from './interfaces';

import './Table.css';

// tslint:disable:line interface-over-type-literal
type ExpandDescriptor = { [key: string]: string | ExpandDescriptor };

// adding a function from utils/functional.ts
function identity<T>(val: T): T {
  return val;
}

interface ITableState<T> {
  columns: IRowConfig<T>;
  foldedColumns: IRowConfig<T>;
  expanded: ExpandDescriptor;
}

interface ITableProps<T> {
  ExtraComponent?: ComponentConstructor<T>;
  columns: IRowConfig<T>;
  data: T[];
  foldableColumns?: boolean;
  minWidth?: number;
  pagination?: boolean;
  page?: number;
  pages?: number;
  perPage?: number;
  getRowState?: IGetRowState<T>;
  onPageChange?(index: number): void;
  onPageSizeChange?(size: number): void;
}

export class Table<T> extends React.Component<ITableProps<T>, ITableState<T>> {
  public static defaultProps = {
    foldableColumns: false,
    minWidth: DEFAULT_MIN_TABLE_WIDTH,
    page: 1,
    pages: 1,
    pagination: false,
    perPage: 20,
  };

  public state = {
    columns: this.props.columns,
    expanded: {},
    foldedColumns: [],
  };

  private divRef: HTMLDivElement | null = null;
  private onResize = _.throttle(() => this.calculateFoldedColumns(), DEFAULT_RESIZE_HANDLE_THROTTLE);

  private get rowCount(): number {
    return this.props.data ? this.props.data.length : 0;
  }

  public componentDidMount() {
    window.addEventListener('resize', this.onResize, false);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public componentWillReceiveProps(nextProps: ITableProps<T>) {
    let newState = {};
    if (
      (this.props.data !== nextProps.data) ||
      (this.state.columns !== nextProps.columns)
    ) {
      newState = {
        ...newState,
        columns: nextProps.columns,
        expanded: {},
      };
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState);
      this.calculateFoldedColumns(this.props.data !== nextProps.data);
    }
  }

  public render() {
    const { expanded } = this.state;

    return (
      <div ref={this.onTableDivRef} style={{ minWidth: this.props.minWidth }}>
        <ReactTable
          NoDataComponent={() => null}
          LoadingComponent={() => null} /* circumvent the react-table always loading bug */
          data={this.props.data || []}
          showPagination={this.props.pagination}
          page={this.props.page! - 1} // react tables pages start from 0
          pages={this.props.pages}
          onExpandedChange={this.onExpanded}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onFilteredChange={this.onFilteredChange}
          expanded={expanded}
          resizable={false}
          expanderDefaults={{
            filterable: false,
            resizable: false,
            sortable: false,
            width: DEFAULT_EXPANDER_WIDTH,
          }}
          columns={this.getColumnsConfig()}
          getTrGroupProps={this.getRowState as any}
          sortable={false}
          minRows={0}
          defaultPageSize={this.props.pagination
            ? this.props.perPage || DEFAULT_PAGE_SIZE
            : this.rowCount}
          className='' // '-striped -highlight'
          SubComponent={this.getSubComponent()!}
          manual={false}
        />
      </div>
    );
  }

  // #TODO @bigd -> type me !!1!
  // Find a way to get internal table state typed and passed to first arg here
  private getRowState = (tableState: any, rowInfo: IRowInfo<T>) => {
    return {
      className: classNames(
        this.canExpand() && rowInfo && tableState.expanded[rowInfo.viewIndex] ? '-expanded' : '',
        this.props.getRowState && this.props.getRowState(rowInfo),
      ),
    };
  }

  private getSubComponent = () => {
    if (this.canExpand()) {
      return (d: IRowInfo<T>) => (
        <DetailRow
          data={d}
          foldedColumns={this.state.foldedColumns}
          ExtraComponent={this.props.ExtraComponent}
          hasFoldedColumns={this.props.foldableColumns}
          getRowState={this.props.getRowState}
        />
      );
    } else {
      return null;
    }
  }

  private canExpand = () => {
    return this.state.foldedColumns.length || this.props.ExtraComponent;
  }

  private onExpanded = (expanded: any) => {
    this.setState({ expanded });
  }

  private onPageChange = (index: number) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(Math.max(0, index) + 1); // react table pages start from 0
    }
    // clear the expanded flags index on page change
    this.setState({ expanded: {} });
  }

  private onPageSizeChange = (size: number) => {
    if (this.props.onPageSizeChange) {
      this.props.onPageSizeChange(size);
    }
    // clear the expanded flags index on page size change
    this.setState({ expanded: {} });
  }

  private onFilteredChange = () => {
    // clear the expanded flags index on filtered change
    this.setState({ expanded: {} });
  }

  private calculateFoldedColumns = (collapseExpanders = false) => {
    if (this.divRef) {
      const { foldableColumns } = this.props;
      const width = this.divRef.offsetWidth;

      let breakpointWidth = DEFAULT_EXPANDER_WIDTH;
      const newFoldedColumns = foldableColumns
        ? this.state.columns
          .map(identity) // because js sort is stupid and inplace
          .sort((a, b) => (b.weight || DEFAULT_COLUMN_WEIGHT) - (a.weight || DEFAULT_COLUMN_WEIGHT))
          .reduce((foldedColumns: IRowConfig<T>, column) => {
            breakpointWidth += (column.minWidth || DEFAULT_MIN_COLUMN_WIDTH);
            if (breakpointWidth > width && foldedColumns.length < (this.state.columns.length - 1)) {
              return [...foldedColumns, column];
            } else {
              return foldedColumns;
            }
          }, [])
        : [];

      if (!_.isEqual(this.state.foldedColumns.map(getColumnId), newFoldedColumns.map(getColumnId))) {
        this.setState({
          // collapse expanders if everything fits in the table and there is no extra else keep the state
          expanded: (this.canExpand() && !collapseExpanders) ? this.state.expanded : {},
          foldedColumns: newFoldedColumns,
        });
      }
    }
  }

  private onTableDivRef = (div: HTMLDivElement | null) => {
    this.divRef = div;
    if (div !== null) {
      this.calculateFoldedColumns();
    }
  }

  private getColumnsConfig() {
    const { columns } = this.props;
    const { foldedColumns } = this.state;

    const config = transformConfig(columns)
      .map((column) => ({
        ...column,
        show: !foldedColumns.map(getColumnId).includes(column.id),
      }));

    if (this.canExpand()) {
      return config.concat([{ Expander, expander: true }]);
    } else {
      return config;
    }
  }
}
