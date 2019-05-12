import * as React from 'react';

import { IProduct, Product } from '../Product/Product';

import styles from './Products.module.css';

interface IProducts {
  productList: IProduct[];
}

export class Products extends React.Component<IProducts> {
  public render() {
    const { productList } = this.props;
    const displayProducts = productList.length
      ? productList.map((prod) => (
        <Product {...prod} key={prod.productId} />
        ))
      : null;
    return (
      <div className={styles['Products']}>
        {displayProducts}
      </div>
    );
  }
}