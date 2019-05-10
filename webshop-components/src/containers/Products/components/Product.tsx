import * as React from 'react';

import './Product.css';

export interface IProduct {
  name: string;
  description: string;
  picture: string;
  price: number;
}

export class Product extends React.PureComponent<IProduct> {
  public render() {
    const {
      name,
      description,
      picture,
      price
    } = this.props;
    return (
      <div className='Product'>
        <h3>{name}</h3>
        <img src={picture} />
        <div className='Description'>{description}</div>
        <div>{price}</div>
      </div>
    );
  }
}