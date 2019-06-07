import * as React from 'react';

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
    return (
      <div className={styles['Product']} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className={styles.ImageHolder}>
          <img className={styles.Image} src={pictureUrl} />
          <div className={`${styles.ImageCover} ${this.state.hoverOnProduct ? styles.Visible : styles.Hidden}`}>
            <button>Read More</button>
            <button>Add to Cart</button>
          </div>
        </div>
        <div className={styles['ProductDetails']}>
          <h3>{name}</h3>
          <div className={styles['Description']}>{description}</div>
        </div>
        <div className={styles['Price']}>{price}</div>
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