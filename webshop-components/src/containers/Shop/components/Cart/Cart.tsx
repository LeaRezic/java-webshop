import * as React from 'react';
import classNames from 'classnames';

import { IProduct, ICartItem } from '../../interfaces';
import { CartItem } from '../CartItem/CartItem';

import styles from './Cart.module.css';

interface ICartProps {
  cartItems: ICartItem[];
  onRemoveProduct: (product: IProduct) => void;
  onIncrementProduct: (product: IProduct) => void;
  onDecrementProduct: (product: IProduct) => void;
}

export class Cart extends React.Component<ICartProps> {
  public render() {
    const { cartItems } = this.props;
    const displayCart = cartItems.length
      ? cartItems.map((prod) => (
          <CartItem
            item={prod}
            key={prod.product.productId}
            onRemoveProduct={this.props.onRemoveProduct}
            onIncrementProduct={this.props.onIncrementProduct}
            onDecrementProduct={this.props.onDecrementProduct}
          />
          ))
      : <div className={styles.CartText}>No products in Cart.</div>;
    return (
      <div>
        {displayCart}
        <div>{`TOTAL: ${this.getTotalPrice()}`}</div>
      </div>
    );
  }

  private getTotalPrice = () => {
    return this.props.cartItems.reduce((prev, curr) => {
      return prev + curr.quantity * curr.product.price;
    }, 0);
  }
}
