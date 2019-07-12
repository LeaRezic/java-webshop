import classNames from 'classnames';
import * as React from 'react';

import { ICellProps } from '../interfaces';
import { PlaceholderValue } from './PlaceholderValue';

import imgLinkPath from '../images/link.png';

import './Cells.css';

export class LinkCell<T> extends React.PureComponent<ICellProps<T, string>> {
  public render() {
    const {
      className,
      constructUrl,
      onClick,
      style,
      value,
      url,
      openInNewTab,
      original,
      urlHandle,
    } = this.props;

    const displayValue = value !== null && value !== undefined ? value : <PlaceholderValue />;
    const linkUrl = constructUrl ? constructUrl(original, this.props) : url;
    const target = openInNewTab ? '_blank' : '';

    return (
      <div
        style={style}
        className={classNames({ ['Clickable']: Boolean(onClick), [className]: true })}
        onClick={(event) => onClick && onClick(event, original, this.props)}
      >
      {
        linkUrl
          ? urlHandle
              ? <div>
                {displayValue}
                <a className={'UrlHandleLink'} href={linkUrl} target={target} >
                  <img className={'UrlHandleImg'} src={imgLinkPath} />
                </a>
              </div>
              : <a href={linkUrl} target={target} className={'Clickable'}>{displayValue}</a>
          : displayValue
      }
      </div>
    );
  }
}
