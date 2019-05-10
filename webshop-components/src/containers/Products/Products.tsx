import * as React from 'react';

import { IProduct, Product } from './components/Product';

import './Products.css';

interface IProducts {
  productList: IProduct[];
}

export class Products extends React.Component<IProducts, any> {
  public render() {
    const { productList } = this.props;
    return (
      <div className='Products'>
        {productList.map((prod) => (
          <Product {...prod} key={prod.name + prod.price} />
        ))}
      </div>
    );
  }
}