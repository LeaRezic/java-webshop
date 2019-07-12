import * as React from 'react';

import { Product } from './Product/Product';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { IProduct } from '../../interfaces';
import { ReactRouterProps } from '../../../../typings/interfaces';

import styles from './Products.module.css';

interface IProducts {
  productList: IProduct[];
  onAddProduct: (productId: number) => void;
}

export class Products extends React.Component<IProducts & ReactRouterProps> {
  public render() {
    const { productList } = this.props;
    const displayProducts = productList.length
      ? productList.map((prod) => (<Product product={prod} key={prod.id} onAddProduct={this.props.onAddProduct} {...this.props} />))
      : <Spinner />;
    return (
      <div className={styles.Products}>
        {displayProducts}
      </div>
    );
  }
}