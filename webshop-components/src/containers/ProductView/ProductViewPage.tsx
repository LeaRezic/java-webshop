import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
  IProductDetailed, IProductViewPageProps, IProductViewPageMappedProps
} from './interfaces';
import {
  addProductToCart,
  removeProductFromCart,
} from '../Shop/state/actions';
import { fetchProduct } from './state/actions';
import { productViewSelector } from './state/selectors';
import { Aux } from '../../hoc/Aux/Aux';

import styles from './ProductViewPage.module.css';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router';
import { ProductDetails } from './components/ProductDetails/ProductDetails';

export class ProductViewComponent extends React.Component<IProductViewPageProps, {}> {

  public componentDidMount() {
    const id = this.props.match.params.id;
    this.props.onProductFetch(id);
  }

  public render() {
    const display = this.props.product
      ? <ProductDetails product={this.props.product} {...this.props} />
      : <Spinner />
    return (
      <Aux>
        {display}
      </Aux>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IProductViewPageMappedProps>({
  product: productViewSelector,
})

const mapDispatchToProps = {
  onProductFetch: fetchProduct,
  onAddProduct: addProductToCart,
  onRemoveProduct: removeProductFromCart,
};

export const ProductViewPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductViewComponent));
