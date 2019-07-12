import * as React from 'react';
import { notify } from 'react-notify-toast';

import { IProductDetailed } from '../../interfaces';
import { ReactRouterProps } from '../../../../typings/interfaces';

import { Aux } from '../../../../hoc/Aux/Aux';
import { getDesiredDimensionsPic } from '../../../../utils/pictureUtil';
import { getFormattedCurrency } from '../../../../utils/currencyUtil';

import styles from './ProductDetails.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';

export interface IProductDetailsProps {
  product: IProductDetailed | null;
  onAddProduct: (productId: number) => void;
}

export class ProductDetails extends React.PureComponent<IProductDetailsProps & ReactRouterProps> {

  public render() {
    const {
      id,
      name,
      description,
      pictureUrl,
      price,
    } = this.props.product!.basic;
    const {
      manufacturerName,
      subcategoryName,
    } = this.props.product!;
    return (
      <Aux>
        <button
          onClick={() => this.goToShopPage()}
          className={`${globalStyles.Btn} ${globalStyles.BtnInfo}`}
        >
          BACK TO SHOPPING
        </button>
        <div className={styles.ProductContainer}>
          <div className={styles.ProductPicture}>
            <div>
              <img src={getDesiredDimensionsPic(pictureUrl, 400)} />
            </div>
          </div>
          <div className={styles.ProductText}>
            <h3 className={styles.PrductTitle}>{name}</h3>
            <div><span className={globalStyles.TextGrayBold}>Description<br/></span><span>{description}</span></div>
            <br/>
            <div><span className={globalStyles.TextGrayBold}>Subcategory: </span><span>{subcategoryName}</span></div>
            <br/>
            <div><span className={globalStyles.TextGrayBold}>Price: </span><span>{getFormattedCurrency(price)}</span></div>
            <br/>
            <div><span className={globalStyles.TextGrayBold}>Manufacturer: </span><span>{manufacturerName}</span></div>
            <br/>
            <div><span className={globalStyles.TextGrayBold}>Read more: </span>{this.getLink()}</div>
            <br/>
            <button
              className={`${globalStyles.Btn} ${globalStyles.BtnSuccess}`}
              onClick={this.handleAddProduct}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Aux>
    );
  }

  private handleAddProduct = () => {
    notify.show(`Added ${this.props.product.basic.name} to cart!`, 'success', 1000);
    this.props.onAddProduct(this.props.product.basic.id);
  }

  private goToShopPage = () => {
    this.props.history.push('/products');
  }

  private getLink = () => {
    return <a href={this.props.product!.externalUrl} target='_blank' >{this.props.product!.externalUrl}</a>
  }

}