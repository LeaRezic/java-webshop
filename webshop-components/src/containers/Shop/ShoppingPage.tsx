import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';

import {
  IShoppingPageProps,
  IShoppingPageMappedProps,
} from './interfaces';
import { Products } from './components/Products/Products';
import {
  fetchProducts,
  addProductToCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  fetchCategories,
  addFilterSubcategories,
  removeFilterSubcategories,
} from './state/actions';
import {
  cartItemsSelector,
  categoriesSelector,
  getProductsSelector,
} from './state/selectors';
import { connect } from 'react-redux';
import { Aux } from '../../hoc/Aux/Aux';
import { Cart } from './components/Cart/Cart';
import { Filters } from './components/Filters/Filters';

import styles from './ShoppingPage.module.css';
import { withRouter } from 'react-router';

interface IShoppingPageState {
  isCartOpen: boolean;
}

export class ShoppingComponent extends React.Component<IShoppingPageProps, IShoppingPageState> {
  public state = {
    isCartOpen: false,
  };

  public componentDidMount() {
    this.props.onProductsFetch();
    this.props.onCategoriesFetch();
  }

  public render() {
    return(
      <Aux>
        <div className={styles.FiltersContainer}>
          <Filters
            filterList={this.props.categories}
            onAddSubcategories={this.props.onAddSubcategories}
            onRemoveSubcategories={this.props.onRemoveSubcategories}
          />
        </div>
        <Products
          productList={this.props.products}
          onAddProduct={this.props.onAddProduct}
          {...this.props}
        />
        <button className={styles.CartBtn} onClick={this.handleCartClick}>CART</button>
        <div className={classNames(styles.CartContainer, { [styles.Visible]: this.state.isCartOpen })}>
          <Cart
            cartItems={this.props.cartItems}
            onRemoveProduct={this.props.onRemoveProduct}
            onDecrementProduct={this.props.onDecrementProduct}
            onIncrementProduct={this.props.onIncrementProduct}
          />
          <button className={styles.CheckoutBtn}>CHECKOUT</button>
        </div>
      </Aux>
    );
  }

  private handleCartClick = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  }
}

const mapStateToProps = createStructuredSelector<any, IShoppingPageMappedProps>({
  products: getProductsSelector,
  cartItems: cartItemsSelector,
  categories: categoriesSelector,
})

const mapDispatchToProps = {
  onProductsFetch: fetchProducts,
  onAddProduct: addProductToCart,
  onRemoveProduct: removeProductFromCart,
  onIncrementProduct: incrementProductQuantity,
  onDecrementProduct: decrementProductQuantity,
  onCategoriesFetch: fetchCategories,
  onAddSubcategories: addFilterSubcategories,
  onRemoveSubcategories: removeFilterSubcategories,
};

export const ShoppingPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingComponent));
