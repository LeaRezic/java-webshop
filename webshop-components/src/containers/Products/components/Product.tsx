import * as React from 'react';

import './Product.css';

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
      <div className='Product'>
        <h3>{name}</h3>
        <img src={pictureUrl} />
        <div className='Description'>{description}</div>
        <div>{price}</div>
      </div>
    );
  }
}