import classNames from 'classnames';
import * as React from 'react';

import { ICellProps } from '../interfaces';
import { PlaceholderValue } from './PlaceholderValue';

import './Cells.css';

export class BooleanCell<T> extends React.PureComponent<ICellProps<T, string>> {
  public render() {
    const {
      className,
      formatter,
      onClick,
      original,
      row,
      value,
      style,
    } = this.props;

    return (
      <div
        style={style}
        className={classNames(className, { ['Clickable']: Boolean(onClick) })}
        onClick={(event) => onClick && onClick(event, original, this.props)}
      >
        { value != null
          ? formatter ? formatter(value, row ? row._original : row) : (value ? 'Yes' : 'No')
          : <PlaceholderValue /> }
      </div>
    );
  }
}
