import classNames from 'classnames';
import * as _ from 'lodash-es';
import * as React from 'react';

import { getCellComponent } from '../Cell';
import { getCellProps, getColumnId } from '../config';
import { IRowConfig } from '../interfaces';
import { IDetailRowProps } from './DetailRow';

import './FoldedColumns.css';
export class FoldedColumns<T> extends React.PureComponent<IDetailRowProps<T>> {
  public render() {
    const {
      data,
      foldedColumns,
      getRowState,
    } = this.props;

    const {
      row,
      original,
    } = data;

    const columns = Object.keys(row).reduce((folded: any, columnName: any) => {
      const column = foldedColumns.find((foldedColumn) => {
        const field = getColumnId(foldedColumn);
        return field === columnName;
      });
      if (column != null) {
        return [...folded, column];
      } else {
        return folded;
      }
    }, []);

    return (
      <div className={classNames('FoldedColumnsWrapperr', getRowState && getRowState(data))}>
        { columns
          .map((column: any, index: any) => {
            // #TODO @bigd -> murderify this :any
            const Cell: any = getCellComponent(column);
            const cellProps = getCellProps(column);

            const accessor = cellProps.accessor;
            const value = typeof accessor === 'function'
              ? accessor(original)
              : _.get(original, accessor);

            return (
              <div
                key={index}
                className={'FoldedColumnContainer'}
              >
                <div className={'FoldedColumnName'}>
                  { column.title }
                </div>
                <div className={'FoldedColumnValue'}>
                  <Cell { ...column } { ...cellProps } { ...data } value={value} />
                </div>
              </div>
            );
          }) }
      </div>
    );
  }
}
