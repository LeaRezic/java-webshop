import * as React from 'react';

import { IProductProps, Product } from '../Product/Product';

import styles from './Products.module.css';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';

interface IProducts {
  productList: IProductProps[];
}

export class Products extends React.Component<IProducts> {
  public render() {
    const { productList } = this.props;
    const displayProducts = productList.length
      ? productList.map((prod) => (
        <Product {...prod} key={prod.productId} />
        ))
      : <Spinner />;
    return (
      <div className={styles['Products']}>
        {displayProducts}
      </div>
    );
  }
}