import * as React from 'react';

import styles from './Product.module.css';

export interface IProduct {
  productId: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
}

export class Product extends React.PureComponent<IProduct> {
  public render() {
    const {
      name,
      description,
      pictureUrl,
      price,
    } = this.props;
    return (
      <div className={styles['Product']}>
        <img className={styles['Image']} src={pictureUrl} />
        <div className={styles['ProductDetails']}>
          <h3>{name}</h3>
          <div className={styles['Description']}>{description}</div>
        </div>
        <div className={styles['Price']}>{price}</div>
      </div>
    );
  }
}