import * as React from 'react';
import classNames from 'classnames';
import { RouteComponentProps, StaticContext } from 'react-router';

import { IProductDetailed } from '../../interfaces';

import styles from './ProductDetails.module.css';

export interface IProductDetailsProps {
  product: IProductDetailed | null;
  onAddProduct: (productId: number) => void;
}

export class ProductDetails extends React.PureComponent<IProductDetailsProps & Readonly<RouteComponentProps<any, StaticContext, any>>> {

  public render() {
    const {
      id,
      name,
      description,
      pictureUrl,
      price,
    } = this.props.product!.basic;
    return (
      <div>
        <h3>{name}</h3>
        <div>
          <img src={pictureUrl} />
        </div>
        <div>{description}</div>
        <div>{price}</div>
        <button onClick={() => this.goToShopPage()} className={`${styles.BtnReadMore}`} >BACK TO SHOPPING</button>
        <button
          className={`${styles.BtnAdd}`}
          onClick={() => this.props.onAddProduct(id)}
        >Add to Cart</button>
      </div>
    );
  }

  private goToShopPage = () => {
    this.props.history.push('/products');
  }

}