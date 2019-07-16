import * as React from 'react';
import classNames from 'classnames';

import { ICartItem } from '../../interfaces';
import { CartItem } from './CartItem/CartItem';
import { getFormattedCurrency } from '../../../../utils/currencyUtil';

import styles from './Cart.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';

interface ICartProps {
  cartItems: ICartItem[];
  onRemoveProduct: (productId: number) => void;
  onIncrementProduct: (productId: number) => void;
  onDecrementProduct: (productId: number) => void;
  onClearCart: () => void;
  onSetQuantity: (productId: number, quantity) => void;
}

export class Cart extends React.Component<ICartProps> {
  public render() {
    const { cartItems } = this.props;
    const displayCart = cartItems.length
      ? cartItems.map((prod) => (
          <CartItem
            item={prod}
            key={prod.product.id}
            onRemoveProduct={this.props.onRemoveProduct}
            onIncrementProduct={this.props.onIncrementProduct}
            onDecrementProduct={this.props.onDecrementProduct}
            onSetQuantity={this.props.onSetQuantity}
          />
          ))
      : <div className={classNames(globalStyles.TextTealLight, styles.CartText)}>No products in Cart.</div>;
    return (
      <div>
        <button
          disabled={cartItems.length === 0}
          className={classNames(globalStyles.BtnSmall, globalStyles.BtnInfo)}
          onClick={this.handleClearAll}
        >
          CLEAR ALL
        </button>
        {displayCart}
        <div className={styles.TotalPrice}>{`TOTAL: ${getFormattedCurrency(this.getTotalPrice())}`}</div>
      </div>
    );
  }

  private handleClearAll = () => {
    if (window.confirm('Clear all products from Cart?')) {
      this.props.onClearCart();
    }
  }

  private getTotalPrice = () => {
    return this.props.cartItems.reduce((prev, curr) => {
      return prev + curr.quantity * curr.product.price;
    }, 0);
  }
}
