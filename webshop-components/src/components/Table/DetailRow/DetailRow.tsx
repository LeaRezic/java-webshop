import * as React from 'react';

import {
  IGetRowState,
  IRowConfig,
  IRowInfo,
} from '../interfaces';
import { FoldedColumns } from './FoldedColumns';

import './DetailRow.css';
export interface IDetailRowProps<T> {
  data: IRowInfo<T>;
  foldedColumns: IRowConfig<T>;
  ExtraComponent?: ComponentConstructor<T>;
  FoldedColumnsComponent?: ComponentConstructor<T>;
  hasFoldedColumns?: boolean;
  getRowState?: IGetRowState<T>;
}

export class DetailRow<T> extends React.PureComponent<IDetailRowProps<T>> {
  public static defaultProps: Partial<IDetailRowProps<any>> = {
    FoldedColumnsComponent: FoldedColumns,
    hasFoldedColumns: false,
  };

  public render() {
    const {
      ExtraComponent,
      FoldedColumnsComponent,
      hasFoldedColumns,
    } = this.props;

    // some styles.sth - CHECK
    return (
      <div className={'DetailRowWrapper'}>
        { hasFoldedColumns
          ? <div className={'FoldedColumnsWrapper'}>
            <FoldedColumnsComponent { ...this.props as any } />
          </div>
          : null }
        { ExtraComponent
          ? <div className={'ExtraWrapper'}>
            <ExtraComponent {...this.props as any } />
          </div>
          : null }
      </div>
    );
  }
}
