import * as React from 'react';
import axios from 'axios';

import { IProductProps } from './components/Product/Product';
import { Products } from './components/Products/Products';

interface IProductsPageState {
  products: IProductProps[];
}

export class ProductsPage extends React.Component<{}, IProductsPageState> {
  public state = {
    products: [],
  }
  public componentDidMount() {
    axios.get('http://localhost:8080/webshop_web_war_exploded/product')
      .then((res) => this.setState({products: res.data.products}))
      .catch((err) => console.log(err));
  }
  public render() {
    return(
      <Products productList={this.state.products} />
    );
  }
}