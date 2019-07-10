import * as React from 'react';
import { withRouter } from 'react-router';
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
  changeFilterCategory,
} from './state/actions';
import {
  cartItemsSelector,
  categoriesSelector,
  getProductsSelector,
  selectedSubcategoryIdsSelector,
  selectedCategoryIdSelector,
} from './state/selectors';
import { connect } from 'react-redux';
import { Aux } from '../../hoc/Aux/Aux';
import { Cart } from './components/Cart/Cart';
import { Filters } from './components/Filters/Filters';

import styles from './ShoppingPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';

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
        <div className={styles.ProductsWithFilters}>
          <div className={styles.FiltersContainer}>
            <Filters
              chosenCategoryId={this.props.chosenCategoryId}
              chosenSubcategoryIds={this.props.chosenSubcategoryIds}
              filterList={this.props.categories}
              onChangeCategoryId={this.props.onChangeCategoryId}
              onAddSubcategories={this.props.onAddSubcategories}
              onRemoveSubcategories={this.props.onRemoveSubcategories}
            />
          </div>
          <div className={styles.ProductsContainer}>
            <Products
              productList={this.props.products}
              onAddProduct={this.props.onAddProduct}
              {...this.props}
            />
          </div>
        </div>
        <button className={`${styles.CartBtn}`} onClick={this.handleCartClick}>
          {this.state.isCartOpen ? `CART >` : `< CART`}
        </button>
        <div className={classNames(styles.CartContainer, { [styles.Visible]: this.state.isCartOpen })}>
          <Cart
            cartItems={this.props.cartItems}
            onRemoveProduct={this.props.onRemoveProduct}
            onDecrementProduct={this.props.onDecrementProduct}
            onIncrementProduct={this.props.onIncrementProduct}
          />
          <button
            disabled={this.props.cartItems.length <= 0}
            onClick={this.handleCheckoutClick}
            className={`${globalStyles.Btn} ${globalStyles.BtnSuccess}`}
          >
            CHECKOUT
          </button>
        </div>
      </Aux>
    );
  }

  private handleCartClick = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  }

  private handleCheckoutClick = () => {
    this.props.history.push('/checkout');
  }
}

const mapStateToProps = createStructuredSelector<any, IShoppingPageMappedProps>({
  products: getProductsSelector,
  cartItems: cartItemsSelector,
  categories: categoriesSelector,
  chosenCategoryId: selectedCategoryIdSelector,
  chosenSubcategoryIds: selectedSubcategoryIdsSelector,
})

const mapDispatchToProps = {
  onProductsFetch: fetchProducts,
  onAddProduct: addProductToCart,
  onRemoveProduct: removeProductFromCart,
  onIncrementProduct: incrementProductQuantity,
  onDecrementProduct: decrementProductQuantity,
  onCategoriesFetch: fetchCategories,
  onChangeCategoryId: changeFilterCategory,
  onAddSubcategories: addFilterSubcategories,
  onRemoveSubcategories: removeFilterSubcategories,
};

export const ShoppingPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingComponent));
