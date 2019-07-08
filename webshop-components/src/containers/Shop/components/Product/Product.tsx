import * as React from 'react';
import classNames from 'classnames';

import { IProduct } from '../../interfaces';

import styles from './Product.module.css';

export interface IProductProps {
  product: IProduct;
}

export interface IProductState {
  hoverOnProduct: boolean;
}

export class Product extends React.PureComponent<IProductProps, IProductState> {

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
        className={classNames(styles.Product, { [styles.HoverProduct]: hoverOnProduct})}
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
        <div className={styles.Price}>{price}</div>
        <button className={`${styles.BtnReadMore}`} >Read More</button>
        <button className={`${styles.BtnAdd}`} >Add to Cart</button>
      </div>
    );
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