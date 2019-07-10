import * as React from 'react';
import classNames from 'classnames';

import { ICartItem } from '../../../interfaces';
import { getDesiredDimensionsPic } from '../../../../../utils/pictureUtil';
import { getFormattedCurrency } from '../../../../../utils/currencyUtil';

import styles from './CartItem.module.css';
import globalStyles from '../../../../../style/GlobalStyle.module.css';

export interface ICartItemProps {
  item: ICartItem;
  onRemoveProduct: (productId: number) => void;
  onIncrementProduct: (productId: number) => void;
  onDecrementProduct: (productId: number) => void;
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
    const { hoverOnCartItem, hoverOnDelete } = this.state;
    return (
      <div
        className={classNames(styles.CartItemContainer, { [styles.HoverContainer]: hoverOnCartItem })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.PictureContainer}>
          <img src={getDesiredDimensionsPic(pictureUrl, 150)} alt='productPhoto'/>
        </div>
        <div className={styles.DetailsContainer}>
          <div className={`${styles.Title} ${hoverOnDelete ? styles.Strike : ''}`}>{name}</div>
          <br/>
          <div><span className={`${globalStyles.TextPurpleLight} ${hoverOnDelete ? styles.Strike : ''}`}>Base Price: {getFormattedCurrency(price)}</span></div>
          <div><span className={`${globalStyles.TextPurpleLight} ${hoverOnDelete ? styles.Strike : ''}`}>Amount: {this.getQuantity(this.props.item.quantity)}</span></div>
          <br/>
          <div className={styles.QuantityBtnsContainer}>
            <button
              className={`${styles.BtnQuantity} ${styles.BtnCartItem}`}
              onClick={() => this.props.onDecrementProduct(this.props.item.product.id)}
            >-</button>
            <div className={`${styles.Price} ${hoverOnDelete ? styles.Strike : ''}`}>{getFormattedCurrency(price * this.props.item.quantity)}</div>
            <button
              className={`${styles.BtnQuantity} ${styles.BtnCartItem}`}
              onClick={() => this.props.onIncrementProduct(this.props.item.product.id)}
            >+</button>
          </div>
        </div>
        <div className={styles.CloseBtnContainer}>
          <button
            className={`${styles.BtnDelete} ${styles.BtnCartItem}`}
            onClick={() => this.props.onRemoveProduct(this.props.item.product.id)}
            onMouseEnter={this.handleMouseEnterDelete}
            onMouseLeave={this.handleMouseLeaveDelete}
          >x</button>
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
