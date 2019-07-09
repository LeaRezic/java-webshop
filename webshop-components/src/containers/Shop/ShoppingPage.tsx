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
import { productsSelector, cartItemsSelector, categoriesSelector } from './state/selectors';
import { connect } from 'react-redux';
import { Aux } from '../../hoc/Aux/Aux';
import { Cart } from './components/Cart/Cart';

import styles from './ShoppingPage.module.css';
import { Filters } from './components/Filters/Filters';

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
        <Filters
          filterList={this.props.categories}
          onAddSubcategories={this.props.onAddSubcategories}
          onRemoveSubcategories={this.props.onRemoveSubcategories}
        />
        <Products
          productList={this.props.products}
          onAddProduct={this.props.onAddProduct}
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
  products: productsSelector,
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

export const ShoppingPage = connect(mapStateToProps, mapDispatchToProps)(ShoppingComponent);
