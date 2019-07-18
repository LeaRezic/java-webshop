import * as React from 'react';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { notify } from 'react-notify-toast';

import {
  IProduct,
  ICartItem,
  ICategory,
} from './interfaces';
import { Products } from './components/Products/Products';
import {
  fetchShopData,
  addProductToCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  addFilterSubcategories,
  removeFilterSubcategories,
  changeFilterCategory,
  clearCart,
  setProductQuantity,
} from './state/actions';
import {
  cartItemsSelector,
  categoriesSelector,
  getProductsSelector,
  selectedSubcategoryIdsSelector,
  selectedCategoryIdSelector,
  fetchingDataSelector,
  dataLoadedSelector,
} from './state/selectors';
import { connect } from 'react-redux';
import { Aux } from '../../hoc/Aux/Aux';
import { Cart } from './components/Cart/Cart';
import { Filters } from './components/Filters/Filters';
import { Modal } from '../../components/Modal/Modal';
import { ReactRouterProps } from '../../typings/interfaces';

import styles from './ShoppingPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';
import { isAuthenticatedSelector } from '../Auth/state/selectors';
import { setRedirectDest } from '../Auth/state/actions';
import { errorSelector } from '../Profile/state/selectors';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { NoData } from '../../components/UI/NoData/NoData';

interface IShoppingPageMappedProps {
  isAuthenticated: boolean;
  products: IProduct[];
  cartItems: ICartItem[];
  categories: ICategory[];
  chosenCategoryId: number;
  chosenSubcategoryIds: number[];
  fetchingData: boolean;
  dataLoaded: boolean;
  error: string;
}

interface IShoppingPageMappedDispatch {
  onFetchData: () => void;
  onAddProduct: (productId: number) => void;
  onRemoveProduct: (productId: number) => void;
  onClearCart: () => void;
  onIncrementProduct: (productId: number) => void;
  onDecrementProduct: (productId: number) => void;
  onChangeCategoryId: (id: number) => void;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
  onSetQuantity: (productId: number, quantity: number) => void;
  onSetAuthRedirect: (dest: string) => void;
}

type IShoppingPageProps =
  & IShoppingPageMappedProps
  & IShoppingPageMappedDispatch
  & ReactRouterProps
  ;

interface IShoppingPageState {
  isCartOpen: boolean;
  showFiltersPopup: boolean;
}

export class ShoppingComponent extends React.Component<IShoppingPageProps, IShoppingPageState> {

  show;
  constructor(props) {
    super(props);
    this.show = notify.createShowQueue();
  }

  public state = {
    isCartOpen: false,
    showFiltersPopup: false,
  };

  public componentDidMount() {
    if (this.props.products === null || this.props.products.length === 0) {
      this.props.onFetchData();
    }
  }

  public render() {
    const filters =
      <Filters
        chosenCategoryId={this.props.chosenCategoryId}
        chosenSubcategoryIds={this.props.chosenSubcategoryIds}
        filterList={this.props.categories}
        onChangeCategoryId={this.props.onChangeCategoryId}
        onAddSubcategories={this.props.onAddSubcategories}
        onRemoveSubcategories={this.props.onRemoveSubcategories}
      />;
    const allData =
      <Aux>
        <button
          className={classNames(styles.FiltersBtn, globalStyles.Btn, globalStyles.BtnSuccessSubtle)}
          onClick={this.handleFiltersClick}
        >
          SET FILTERS
        </button>
        <div className={styles.ProductsWithFilters}>
          <div className={styles.FiltersContainer}>
            {filters}
          </div>
          <div className={styles.ProductsContainer}>
            <Products
              productList={this.props.products}
              onAddProduct={this.props.onAddProduct}
              {...this.props}
            />
          </div>
        </div>
        <button className={styles.CartBtn} onClick={this.handleCartClick}>
          {this.state.isCartOpen
            ? <i className={classNames('fas fa-chevron-right', styles.Icon)} />
            : <i className={classNames('fas fa-chevron-left', styles.Icon)} />}
          <i className={classNames('fas fa-shopping-cart', styles.CartIcon)} />
        </button>
        <div className={classNames(styles.CartContainer, { [styles.Visible]: this.state.isCartOpen })}>
          <Cart
            cartItems={this.props.cartItems}
            onRemoveProduct={this.props.onRemoveProduct}
            onDecrementProduct={this.props.onDecrementProduct}
            onIncrementProduct={this.props.onIncrementProduct}
            onClearCart={this.props.onClearCart}
            onSetQuantity={this.props.onSetQuantity}
          />
          <button
            disabled={this.props.cartItems.length <= 0}
            onClick={this.handleCheckoutClick}
            className={classNames(globalStyles.Btn, globalStyles.BtnSuccessSubtle)}
          >
            CHECKOUT
          </button>
        </div>
        {this.state.showFiltersPopup
          ? <Modal show={this.state.showFiltersPopup} onModalClosed={this.handleClosePopup} >
            {filters}
          </Modal>
          : null}
      </Aux>
    return(
        this.props.fetchingData
        ? <Spinner />
        : this.props.dataLoaded && this.props.products !== null && this.props.categories !== null
          ? { allData }
          : <Aux>
            <NoData />
            {this.props.error !== null
              ? <div className={globalStyles.GrimzonBold}>{this.props.error}</div>
              : null}
          </Aux>
    );
  }

  private handleFiltersClick = () => {
    this.setState({ showFiltersPopup: true });
  }

  private handleClosePopup = () => {
    this.setState({ showFiltersPopup: false });
  }

  private handleCartClick = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  }

  private handleCheckoutClick = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push('/checkout');
    } else {
      this.show('Please log in or register before checking out.', 'warning', 4000);
      this.props.onSetAuthRedirect('/checkout');
      this.props.history.push('/auth');
    }
  }
}

const mapStateToProps = createStructuredSelector<any, IShoppingPageMappedProps>({
  isAuthenticated: isAuthenticatedSelector,
  products: getProductsSelector,
  cartItems: cartItemsSelector,
  categories: categoriesSelector,
  chosenCategoryId: selectedCategoryIdSelector,
  chosenSubcategoryIds: selectedSubcategoryIdsSelector,
  fetchingData: fetchingDataSelector,
  dataLoaded: dataLoadedSelector,
  error: errorSelector,
})

const mapDispatchToProps: IShoppingPageMappedDispatch = {
  onFetchData: fetchShopData,
  onAddProduct: addProductToCart,
  onRemoveProduct: removeProductFromCart,
  onIncrementProduct: incrementProductQuantity,
  onDecrementProduct: decrementProductQuantity,
  onChangeCategoryId: changeFilterCategory,
  onAddSubcategories: addFilterSubcategories,
  onRemoveSubcategories: removeFilterSubcategories,
  onClearCart: clearCart,
  onSetQuantity: setProductQuantity,
  onSetAuthRedirect: setRedirectDest,
};

export const ShoppingPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingComponent));
