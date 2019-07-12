import { ActionsCell } from './ActionsCell';
import { BooleanCell } from './BooleanCell';
import { LinkCell } from './LinkCell';
import { StatusCell } from './StatusCell';
import { TextCell } from './TextCell';

import { ColumnAlignment, IColumnConfig } from '../interfaces';

function identity<T>(val: T): T {
  return val;
}

export enum CellType {
  Actions = 'Actions',
  Boolean = 'Boolean',
  Link = 'Link',
  Number = 'Number',
  Status = 'Status',
  Text = 'Text',
  Object = 'Object',
}

export const getCellComponent = <T>(column: IColumnConfig<T>) => {
  switch (column.cellType) {
  case CellType.Actions: return ActionsCell;
  case CellType.Link: return LinkCell;
  case CellType.Status: return StatusCell;
  case CellType.Boolean: return BooleanCell;
  case CellType.Text:
  case CellType.Number:
  case CellType.Object:
  default: return TextCell;
  }
};

// tslint:disable:line ban-types
export const getDefaultFormatter = <T>(column: IColumnConfig<T>): Function => {
  switch (column.cellType) {
  case CellType.Object: return (v: any) => String(v);
  default: return identity;
  }
};

export const getDefaultAlignment = <T>(column: IColumnConfig<T>): ColumnAlignment => {
  switch (column.cellType) {
      default: return ColumnAlignment.Left;
  }
};

export {
  TextCell,
};
