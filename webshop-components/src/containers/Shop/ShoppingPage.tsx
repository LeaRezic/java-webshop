import * as React from 'react';
import { createStructuredSelector } from 'reselect';

import {
  IShoppingPageProps,
  IProduct,
} from './interfaces';
import { Products } from './components/Products/Products';
import {
  fetchProducts,
  addProductToCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
} from './state/actions';
import { productsSelector } from './state/selectors';
import { connect } from 'react-redux';

export interface IShoppingPageMappedProps {
  products: IProduct[],
};

export class ShoppingComponent extends React.Component<IShoppingPageProps, {}> {
  public componentDidMount() {
    this.props.onProductsFetch();
  }
  public render() {
    return(
      <Products productList={this.props.products} />
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IShoppingPageMappedProps>({
  products: productsSelector,
})

const mapDispatchToProps = {
  onProductsFetch: fetchProducts,
  onAddProduct: addProductToCart,
  onRemoveProduct: removeProductFromCart,
  onIncrementProduct: incrementProductQuantity,
  onDecrementProduct: decrementProductQuantity,
};

export const ShoppingPage = connect(mapStateToProps, mapDispatchToProps)(ShoppingComponent);
