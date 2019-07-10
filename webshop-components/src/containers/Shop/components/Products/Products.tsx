import * as React from 'react';

import { Product } from './Product/Product';

import styles from './Products.module.css';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { IProduct } from '../../interfaces';
import { RouteComponentProps, StaticContext } from 'react-router';

interface IProducts {
  productList: IProduct[];
  onAddProduct: (productId: number) => void;
}

export class Products extends React.Component<IProducts & Readonly<RouteComponentProps<any, StaticContext, any>>> {
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