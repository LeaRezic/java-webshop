import * as React from 'react';
import classNames from 'classnames';
import { notify } from 'react-notify-toast';
import { RouterProps } from 'react-router';

import { ICartItem } from '../Shop/interfaces';
import { CartItem } from '../Shop/components/Cart/CartItem/CartItem';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addProductToCart, removeProductFromCart, incrementProductQuantity, decrementProductQuantity } from '../Shop/state/actions';
import { cartItemsSelector } from '../Shop/state/selectors';
import { authTokenSelector } from '../Auth/state/selectors';

import styles from './CheckoutPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';
import { createReceiptRequest, clearError } from './state/actions';
import { ICreateReceiptRequest, ICreateReceiptItem } from './interfaces';
import { redirectToProfileSelector, createReceiptErrorSelector } from './state/selectors';
import { stopRedirectToProducts } from '../Auth/state/actions';

interface ICheckoutPageMappedProps {
  authToken: string;
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
    const itemList = cartItems.length > 0
      ? cartItems.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          onDecrementProduct={this.props.onDecrementProduct}
          onIncrementProduct={this.props.onIncrementProduct}
          onRemoveProduct={this.props.onRemoveProduct}
        />
      ))
      : <div>
        <p>NO PRODUCTS IN CART</p>
        <button
          onClick={this.redirectToShop}
          className={classNames(globalStyles.Btn, globalStyles.BtnInfo)}
        >
          BACK TO SHOPPING
        </button>
      </div>
    return (
      <div className={styles.Container}>
        <div className={styles.OrderContainer}>
          { itemList }
        </div>
        <hr/>
        <div className={styles.TotalContainer}>
          Total: NNNN
        </div>
        <div className={styles.PaymentContainer}>
          Payment method: cash or pay pal
        </div>
        <button
          disabled={this.props.cartItems.length === 0}
          className={classNames(globalStyles.Btn, globalStyles.BtnSuccess)}
          onClick={this.handleConfirmOrder}
        >
          CONFIRM ORDER
        </button>
      </div>
    );
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
};

export const CheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPageComponent);
