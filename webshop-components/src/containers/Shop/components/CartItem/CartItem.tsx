import * as React from 'react';
import classNames from 'classnames';

import { ICartItem, IProduct } from '../../interfaces';

import styles from './CartItem.module.css';

export interface ICartItemProps {
  item: ICartItem;
  onRemoveProduct: (product: IProduct) => void;
  onIncrementProduct: (product: IProduct) => void;
  onDecrementProduct: (product: IProduct) => void;
}

export interface ICartItemState {
  hoverOnCartItem: boolean;
}

export class CartItem extends React.PureComponent<ICartItemProps, ICartItemState> {

  public state = { hoverOnCartItem: false }

  public render() {
    const {
      name,
      pictureUrl,
      price,
    } = this.props.item.product;
    const { hoverOnCartItem } = this.state;
    return (
      <div
        className={classNames(styles.CartItemContainer, { [styles.HoverContainer]: hoverOnCartItem })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.PictureContainer}>
          <img src={this.getDesiredDimensionsPic(pictureUrl, 100, 100)} alt='productPhoto'/>
        </div>
        <div className={styles.DetailsContainer}>
          <div className={styles.Title}>{name}</div>
          <div className={styles.Price}>{price * this.props.item.quantity}</div>
          <div className={styles.QuantityBtnsContainer}>
            <button onClick={() => this.props.onDecrementProduct(this.props.item.product)}>-</button>
            <span className={styles.Quantity}>{this.getQuantity(this.props.item.quantity)}</span>
            <button onClick={() => this.props.onIncrementProduct(this.props.item.product)}>+</button>
          </div>
        </div>
        <div className={styles.CloseBtnContainer}>
          <button onClick={() => this.props.onRemoveProduct(this.props.item.product)}>x</button>
        </div>
      </div>
    );
  }

  private handleMouseEnter = () => {
    this.setState({ hoverOnCartItem: true });
  }

  private handleMouseLeave = () => {
    this.setState({ hoverOnCartItem: false });
  }

  private getQuantity = (quantity: number) => {
    return quantity >= 10
      ? quantity.toString()
      : `0${quantity}`;
  }

  private getDesiredDimensionsPic = (url: string, width: number, height: number = 0) => {
    const segments = url.split('/');
    segments.pop();
    segments.pop();
    segments.push(width.toString());
    segments.push(height ? height.toString() : width.toString());
    return segments.join('/');
  }
}