import classNames from 'classnames';
import * as React from 'react';

import { IActionInfo, ICellProps } from '../interfaces';
import { PlaceholderValue } from './PlaceholderValue';

import './Cells.css';

export type BooleanMapper<T> = (value: T) => boolean;
export type BooleanExpr<T> = boolean | BooleanMapper<T>;

function evaluateBooleanExpr<T>(expression: BooleanExpr<T>, value?: T): boolean {
  return expression === true || (typeof expression === 'function' && value !== undefined && expression(value));
}

export class ActionsCell<T> extends React.PureComponent<ICellProps<T, any>> {
  public static defaultProps: Partial<ICellProps<any, any>> = {
    actions: [],
  };

  public render() {
    const {
      className,
      onClick,
      style,
      actions,
      original,
    } = this.props;

    const actionsToRender = actions
      .map((action) => ({ isVisible: true, ...action }))
      .filter((action) => evaluateBooleanExpr(action.isVisible as any, original)); // #FIXME @bigd -> deal with this any BooleanMaper shenanigans

    return (
      <div
        style={style}
        className={classNames({ ['Clickable']: Boolean(onClick), [className]: Boolean(className) })}
      >
        { actionsToRender.map((action, idx) => this.renderAction(action, idx, original)) }
        { !actionsToRender.length
          ? <PlaceholderValue />
          : null }
      </div>
    );
  }

  private renderAction = (action: IActionInfo<T>, index: number, original: T) => {
    const {
      title,
      icon,
      className,
      disabled,
      onClick,
      tooltip,
    } = action;

    const text = typeof title === 'function' ? title(original) : title;
    const hint = typeof tooltip === 'function' ? tooltip(original) : tooltip;
    const isDisabled = evaluateBooleanExpr(disabled as any, original);  // #FIXME @bigd -> deal with this any BooleanMaper shenanigans

    const classnames = classNames({
      ['btn btn-default']: !Boolean(className),
      [className]: Boolean(className),
      ['BtnDisabled']: isDisabled,
    });

    return (
      <button
        type='button'
        className={classnames}
        onClick={(event) => onClick && onClick(event, original, this.props)}
        disabled={isDisabled}
        key={`action${this.props.index}_${index}`}
        title={hint || ''}
      >
        <i className={icon} /> {text != null ? text : null}
      </button>
    );
  }
}
