import * as React from 'react';
import classNames from 'classnames';
import { notify } from 'react-notify-toast';
import { RouterProps } from 'react-router';

import { ICartItem } from '../Shop/interfaces';
import { CartItem } from '../Shop/components/Cart/CartItem/CartItem';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addProductToCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  setProductQuantity,
} from '../Shop/state/actions';
import { cartItemsSelector } from '../Shop/state/selectors';
import {
  authTokenSelector,
  usernameSelector,
} from '../Auth/state/selectors';
import {
  createReceiptRequest,
  clearError,
} from './state/actions';
import {
  ICreateReceiptRequest,
  ICreateReceiptItem,
  PaymentMethod,
} from './interfaces';
import {
  redirectToProfileSelector,
  createReceiptErrorSelector,
} from './state/selectors';
import { stopRedirectToProducts } from '../Auth/state/actions';
import { PayPal } from './components/PayPal/PayPal';

import styles from './CheckoutPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';
import { NoData } from '../../components/UI/NoData/NoData';
import { getFormattedCurrency } from '../../utils/currencyUtil';

interface ICheckoutPageMappedProps {
  authToken: string;
  username: string;
  cartItems: ICartItem[];
  shouldRedirect: boolean;
  error: string;
}

interface ICheckoutPageMappedDispatch {
  onRemoveProduct: (productId: number) => void;
  onIncrementProduct: (productId: number) => void;
  onDecrementProduct: (productId: number) => void;
  onConfirmOrder: (requestData: ICreateReceiptRequest) => void;
  onStopRedirect: () => void;
  onClearError: () => void;
  onSetQuantity: (productId: number, quantity: number) => void;
}

type ICheckoutPageProps = ICheckoutPageMappedProps & ICheckoutPageMappedDispatch & RouterProps;

class CheckoutPageComponent extends React.PureComponent<ICheckoutPageProps> {

  show;
  constructor(props) {
    super(props);
    this.show = notify.createShowQueue();
  }

  public componentDidUpdate() {
    if (this.props.shouldRedirect) {
      this.props.onStopRedirect();
      this.props.history.push('/profile');
    }

    if (this.props.error) {
      this.show(this.props.error, 'error', 4000);
      this.props.onClearError();
    }
  }

  public render() {
    const { cartItems } = this.props;
    const cartEmpty = cartItems.length === 0;
    return (
        cartEmpty
        ? <div>
            <NoData message={'Cart Empty'} />
            <button
              onClick={this.redirectToShop}
              className={classNames(globalStyles.Btn, globalStyles.BtnInfo)}
            >
              BACK TO SHOPPING
            </button>
          </div>
        : (
          <div className={styles.Container}>
            <div className={styles.OrderContainer}>
              <div className={globalStyles.CrimzonBigUppercase}>YOUR ITEMS</div>
              <hr />
              <div className={styles.CartItemsContainer}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onDecrementProduct={this.props.onDecrementProduct}
                    onIncrementProduct={this.props.onIncrementProduct}
                    onRemoveProduct={this.props.onRemoveProduct}
                    onSetQuantity={this.props.onSetQuantity}
                    color={'#644E5B'}
                  />
                ))
                }
              </div>
            </div>
            <div className={styles.Padder} />
            <div className={styles.PaymentContainer}>
              <hr />
              <div className={globalStyles.CrimzonBigUppercase}>
                TOTAL: {getFormattedCurrency(this.getTotalPrice())}
              </div>
              <hr />
              <div className={globalStyles.CrimzonBigUppercase}>PAYMENT OPTIONS</div>
              <div className={styles.ButtonsContainer}>
                <PayPal
                  totalAmount={this.getTotalPrice()}
                  onCancel={this.handleCancelPayPal}
                  onError={this.handleErrorPayPal}
                  onSuccess={this.handleSuccessPayPal}
                />
                <button
                  disabled={this.props.cartItems.length === 0}
                  className={classNames(globalStyles.BtnSmall, globalStyles.BtnSuccess)}
                  onClick={this.handleConfirmOrder}
                >
                  CASH
                </button>
              </div>
            </div>
          </div>
        )
    );
  }

  private getTotalPrice = () => {
    return this.props.cartItems.reduce((prev, curr) => {
      return prev + curr.quantity * curr.product.price;
    }, 0);
  }

  private handleCancelPayPal = () => {
    this.show('Cancelled PayPal checkout.', 'warning', 3000);
  }

  private handleErrorPayPal = () => {
    this.show('Error with PayPal checkout.\nPlease try again or contact support.', 'error', 3000);
  }

  private handleSuccessPayPal = () => {
    this.show('PayPal verified!', 'success', 2000);
    const data: ICreateReceiptRequest = {
      tokenId: this.props.authToken,
      paymentMethod: PaymentMethod.PAY_PAL,
      username: this.props.username,
      items: this.getItemsFromCart(),
    }
    this.props.onConfirmOrder(data);
  }

  private redirectToShop = () => {
    this.props.history.push('/products');
  }

  private handleConfirmOrder = () => {
    const password = prompt('Please reenter your password');
    if (password === null || password.trim().length === 0) {
      this.show('Cannot proceed without reenting password.', 'warning', 4000);
      return;
    }
    const data: ICreateReceiptRequest = {
      tokenId: this.props.authToken,
      password: password,
      paymentMethod: PaymentMethod.CASH,
      items: this.getItemsFromCart(),
    }
    this.props.onConfirmOrder(data);
  }

  private getItemsFromCart = (): ICreateReceiptItem[] => {
    return this.props.cartItems.map((citem) => ({
      productId: citem.product.id,
      ammount: citem.quantity,
    }));
  }
}

const mapStateToProps = createStructuredSelector<any, ICheckoutPageMappedProps>({
  authToken: authTokenSelector,
  username: usernameSelector,
  cartItems: cartItemsSelector,
  shouldRedirect: redirectToProfileSelector,
  error: createReceiptErrorSelector,
})

const mapDispatchToProps = {
  onAddProduct: addProductToCart,
  onRemoveProduct: removeProductFromCart,
  onIncrementProduct: incrementProductQuantity,
  onDecrementProduct: decrementProductQuantity,
  onConfirmOrder: createReceiptRequest,
  onStopRedirect: stopRedirectToProducts,
  onClearError: clearError,
  onSetQuantity: setProductQuantity,
};

export const CheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPageComponent);
