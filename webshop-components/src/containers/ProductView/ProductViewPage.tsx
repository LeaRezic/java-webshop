import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  IProductViewPageProps,
  IProductViewPageMappedProps,
} from './interfaces';
import {
  addProductToCart,
  removeProductFromCart,
} from '../Shop/state/actions';
import { fetchProduct } from './state/actions';
import {
  productViewSelector,
  dataLoadedSelector,
  errorSelector,
  isFetchingData,
} from './state/selectors';
import { Aux } from '../../hoc/Aux/Aux';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { NoData } from '../../components/UI/NoData/NoData';

import styles from './ProductViewPage.module.css';
import globalStyles from '../../style/GlobalStyle.module.css';

export class ProductViewComponent extends React.Component<IProductViewPageProps, {}> {

  public componentDidMount() {
    const id = this.props.match.params.id;
    this.props.onProductFetch(id);
  }

  public render() {
    const display = this.props.isFetchingData
      ? <Spinner />
      : this.props.dataLoaded && this.props.product !== null
        ? <ProductDetails product={this.props.product} {...this.props} />
        : <Aux>
            <NoData />
            { this.props.error !== null
              ? <div className={globalStyles.GrimzonBold}>{this.props.error}</div>
              : null }
          </Aux>
    return (
      <Aux>
        <div className={styles.Container}>
          {display}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IProductViewPageMappedProps>({
  product: productViewSelector,
  dataLoaded: dataLoadedSelector,
  error: errorSelector,
  isFetchingData: isFetchingData,
});

const mapDispatchToProps = {
  onProductFetch: fetchProduct,
  onAddProduct: addProductToCart,
  onRemoveProduct: removeProductFromCart,
};

export const ProductViewPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductViewComponent));
