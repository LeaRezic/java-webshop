import * as React from 'react';

import { IReceiptDetailed, IReceiptItem } from '../../interfaces';

import styles from './ReceiptDetailed.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';
import { getFormattedCurrency } from '../../../../utils/currencyUtil';
import { getDesiredDimensionsPic } from '../../../../utils/pictureUtil';

interface IReceiptDetailedProps {
  receipt: IReceiptDetailed;
}

class ReceiptItem extends React.PureComponent<IReceiptItem> {
  public render() {
    const { productName, productPrice, amount, productUrl } = this.props;
    return(
      <div className={styles.ItemContainer}>
        <div className={styles.PictureContainer}>
          <img src={getDesiredDimensionsPic(productUrl, 50)} alt='product photo'/>
        </div>
        <div className={styles.DescriptionContainer}>
          <div><span className={globalStyles.TextLightGraySmall}>Product: </span>{productName}</div>
          <div><span className={globalStyles.TextLightGraySmall}>Base Price: </span>{getFormattedCurrency(productPrice)}</div>
          <div><span className={globalStyles.TextLightGraySmall}>Quantity: </span> {amount}</div>
        </div>
      </div>
    );
  }
}

export class ReceiptDetailed extends React.PureComponent<IReceiptDetailedProps> {
  public render() {
    const { receipt } = this.props;
    return (
      <div className={styles.Container}>
        <div className={globalStyles.TextGrayBold}>Receipt Number {receipt.basic.number}</div>
        <hr/>
        <div><span className={globalStyles.TextLightGray}>Purchase Date: </span>{receipt.basic.purchaseDate}</div>
        <div><span className={globalStyles.TextLightGray}>Price Paid: </span>{getFormattedCurrency(receipt.basic.amount)}</div>
        <div><span className={globalStyles.TextLightGray}>Number of Products: </span>{receipt.basic.totalProducts}</div>
        <br/>
        <div>
          <span className={globalStyles.TextGrayBold}>Items</span>
          <hr />
          <div>
            {receipt.items.map((item) => ( <ReceiptItem key={item.id} {...item} /> ))}
          </div>
        </div>
        <br/>
      </div>
    );
  }
}