import * as React from 'react';
import { notify } from 'react-notify-toast';
import classNames from 'classnames';

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

  show;
  constructor(props) {
    super(props);
    this.show = notify.createShowQueue();
  }

  public render() {
    const {
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
          className={classNames(globalStyles.Btn, globalStyles.BtnInfo)}
        >
          BACK TO SHOPPING
        </button>
        <div className={styles.ProductContainer}>
          <img className={styles.Img} src={getDesiredDimensionsPic(pictureUrl, 400)} />
          <div className={styles.ProductText}>
            <h3 className={styles.PrductTitle}>{name}</h3>
            <div className={globalStyles.GrimzonBoldUppercase}>Description</div>
            <div>{description}</div>
            <br/>
            <div className={globalStyles.GrimzonBoldUppercase}>Subcategory</div>
            <div>{subcategoryName}</div>
            <br/>
            <div className={globalStyles.GrimzonBoldUppercase}>Price</div>
            <div>{getFormattedCurrency(price)}</div>
            <br/>
            <div className={globalStyles.GrimzonBoldUppercase}>Manufacturer</div>
            <div>{manufacturerName}</div>
            <br/>
            <div className={globalStyles.GrimzonBoldUppercase}>Read more</div>
            <div>{this.getLink()}</div>
            <br/>
            <button
              className={`${globalStyles.Btn} ${globalStyles.BtnSuccessSubtle}`}
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
    this.show(`Added ${this.props.product.basic.name} to cart!`, 'success', 1000);
    this.props.onAddProduct(this.props.product.basic.id);
  }

  private goToShopPage = () => {
    this.props.history.push('/products');
  }

  private getLink = () => {
    return <a href={this.props.product!.externalUrl} target='_blank' >{this.props.product!.externalUrl}</a>
  }

}