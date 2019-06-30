import * as React from 'react';
import classNames from 'classnames';

import styles from './Product.module.css';

export interface IProductProps {
  productId: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
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
    } = this.props;
    const { hoverOnProduct } = this.state;
    return (
      <div
        className={classNames(styles.Product, { [styles.HoverProduct]: hoverOnProduct})}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.ImageHolder}>
          {
            hoverOnProduct
              ? (
                <div className={classNames(styles.Image, styles.Cover)}>
                  <button className={`${styles.BtnReadMore} ${hoverOnProduct ? styles.Visible : styles.Hidden}`} >Read More</button>
                  <button className={`${styles.BtnAdd} ${hoverOnProduct ? styles.Visible : styles.Hidden}`} >Add to Cart</button>
                </div>
              )
              : <img className={styles.Image} src={pictureUrl} />
          }
          {/* <div className={`${styles.ImageCover} ${hoverOnProduct ? styles.Visible : styles.Hidden}`}/> */}
        </div>
        <div className={styles.ProductDetails}>
          <h3>{name}</h3>
          <div className={styles.Description}>{description}</div>
        </div>
        <div className={styles.Price}>{price}</div>
      </div>
    );
  }

  private handleMouseEnter = () => {
    this.setState({hoverOnProduct: true});
  }

  private handleMouseLeave = () => {
    this.setState({hoverOnProduct: false});
  }
}