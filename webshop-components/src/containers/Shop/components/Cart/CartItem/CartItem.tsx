import * as React from 'react';
import classNames from 'classnames';

import { ICartItem } from '../../../interfaces';
import { getDesiredDimensionsPic } from '../../../../../utils/pictureUtil';
import { getFormattedCurrency } from '../../../../../utils/currencyUtil';

import styles from './CartItem.module.css';
import globalStyles from '../../../../../style/GlobalStyle.module.css';

export interface ICartItemProps {
  item: ICartItem;
  color?: string;
  colorHover?: string;
  onRemoveProduct: (productId: number) => void;
  onIncrementProduct: (productId: number) => void;
  onDecrementProduct: (productId: number) => void;
  onSetQuantity: (productId: number, quantity: number) => void;
}

export interface ICartItemState {
  hoverOnCartItem: boolean;
  hoverOnDelete: boolean;
}

export class CartItem extends React.PureComponent<ICartItemProps, ICartItemState> {

  public state = {
    hoverOnCartItem: false,
    hoverOnDelete: false,
  }

  public render() {
    const {
      name,
      pictureUrl,
      price,
    } = this.props.item.product;
    const color = this.props.color || 'transparent';
    const colorHover = this.props.colorHover || '#30415D';
    const { hoverOnCartItem, hoverOnDelete } = this.state;
    return (
      <div
        className={classNames(styles.CartItemContainer)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ backgroundColor: hoverOnCartItem ? colorHover : color }}
      >
        <div className={styles.PictureContainer}>
          <img src={getDesiredDimensionsPic(pictureUrl, 150)} alt='productPhoto'/>
        </div>
        <div className={styles.DetailsContainer}>
          <div className={`${styles.Title} ${hoverOnDelete ? styles.Strike : ''}`}>
            {name}
          </div>
          <br/>
          <div>
            <span className={classNames(globalStyles.GrimzonBold, {[styles.Strike]: hoverOnDelete})}>
              Base Price: {getFormattedCurrency(price)}
            </span>
          </div>
          <div>
            <span className={classNames(globalStyles.GrimzonBold, { [styles.Strike]: hoverOnDelete })}>
              Amount: {this.getQuantity(this.props.item.quantity)}
            </span>
          </div>
          <br/>
          <div className={styles.QuantityBtnsContainer}>
            <button
              className={classNames(styles.BtnQuantity, styles.BtnCartItem)}
              onClick={() => this.props.onDecrementProduct(this.props.item.product.id)}
            >
              -
            </button>
            <div className={classNames(styles.Price, { [styles.Strike]: hoverOnDelete })}>
              {getFormattedCurrency(price * this.props.item.quantity)}
            </div>
            <button
              className={classNames(styles.BtnQuantity, styles.BtnCartItem)}
              onClick={() => this.props.onIncrementProduct(this.props.item.product.id)}
            >
              +
            </button>
            <button
              className={classNames(styles.BtnQuantity, styles.BtnCartItem)}
              onClick={this.handleSetQuantity}
              style={{fontSize: '0.8rem'}}
            >
              SET
            </button>
          </div>
        </div>
        <div className={styles.CloseBtnContainer}>
          <button
            className={classNames(styles.BtnDelete, styles.BtnCartItem)}
            onClick={() => this.props.onRemoveProduct(this.props.item.product.id)}
            onMouseEnter={this.handleMouseEnterDelete}
            onMouseLeave={this.handleMouseLeaveDelete}
          >
            x
          </button>
        </div>
      </div>
    );
  }

  private handleSetQuantity = () => {
    const amount = window.prompt('Enter quantity, whole number above 0.');
    let message = null;
    if (amount === null || amount.trim().length === 0) {
      message = 'Amount cannot be empty. Made no changes.';
    } else if (
      isNaN(parseFloat(amount))
      || parseFloat(amount).toString() !== amount
      || parseFloat(amount).toFixed(0).toString() !== amount
      || parseFloat(amount) <= 0) {
      message = `${amount} is not a valid amount (whole number above 0). Made no changes.`;
    }
    if (message === null) {
      this.props.onSetQuantity(this.props.item.product.id, parseFloat(amount));
      return;
    }
    window.alert(message);
  }

  private handleMouseEnter = () => {
    this.setState({ hoverOnCartItem: true });
  }

  private handleMouseLeave = () => {
    this.setState({ hoverOnCartItem: false });
  }

  private handleMouseEnterDelete = () => {
    this.setState({ hoverOnDelete: true });
  }

  private handleMouseLeaveDelete = () => {
    this.setState({ hoverOnDelete: false });
  }

  private getQuantity = (quantity: number) => {
    return quantity >= 10
      ? quantity.toString()
      : `0${quantity}`;
  }
}
