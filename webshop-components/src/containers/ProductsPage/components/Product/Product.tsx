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
      price
    } = this.props;
    return (
      <div className={styles['Product']}>
        <h3>{name}</h3>
        <img className={styles['Image']} src={pictureUrl} />
        <div className={styles['Description']}>{description}</div>
        <div>{price}</div>
      </div>
    );
  }
}