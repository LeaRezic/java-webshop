import * as React from 'react';
import classNames from 'classnames';
import { notify } from 'react-notify-toast';

import { IProduct } from '../../../interfaces';
import { getFormattedCurrency } from '../../../../../utils/currencyUtil';
import { ReactRouterProps } from '../../../../../typings/interfaces';

import styles from './Product.module.css';
import globalStyles from '../../../../../style/GlobalStyle.module.css';

export interface IProductProps {
  product: IProduct;
  onAddProduct: (productId: number) => void;
}

export interface IProductState {
  hoverOnProduct: boolean;
}

export class Product extends React.PureComponent<IProductProps & ReactRouterProps, IProductState> {

  public state = { hoverOnProduct: false }

  public render() {
    const {
      name,
      description,
      pictureUrl,
      price,
    } = this.props.product;
    const { hoverOnProduct } = this.state;
    return (
      <div
        className={classNames(styles.Product)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.ImageHolder}>
          <img className={styles.Image} src={pictureUrl} />
        </div>
        <div className={styles.ProductDetails}>
          <h3 className={styles.Title}>{name}</h3>
          <div className={styles.Description}>{this.getLimitedDescription(description)}</div>
        </div>
        <div className={styles.Price}>{getFormattedCurrency(price)}</div>
        <div className={styles.ButtonsContainer}>
          <button
            onClick={() => this.goToProductPage()}
            className={`${globalStyles.BtnSmall} ${globalStyles.BtnInfo} ${hoverOnProduct ? globalStyles.BtnInfoActive : globalStyles.BtnInfo}`}
          >
            Read More
          </button>
          <button
            className={`${globalStyles.BtnSmall} ${globalStyles.BtnSuccess} ${hoverOnProduct ? globalStyles.BtnSuccessActive : globalStyles.BtnSucceess}`}
            onClick={this.handleAddProduct}
          >
            Add to Cart
        </button>
        </div>
      </div>
    );
  }

  private handleAddProduct = () => {
    notify.show(`Added ${this.props.product.name} to cart!`, 'success', 1000);
    this.props.onAddProduct(this.props.product.id);
  }

  private goToProductPage = () => {
    this.props.history.push(`/products/${this.props.product.id}`);
  }

  private getLimitedDescription = (description: string) => {
    if (description.length > 100) {
      return description.substr(0, 100) + '...';
    }
    return description;
  }

  private handleMouseEnter = () => {
    this.setState({hoverOnProduct: true});
  }

  private handleMouseLeave = () => {
    this.setState({hoverOnProduct: false});
  }
}