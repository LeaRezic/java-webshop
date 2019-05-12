import axios from 'axios';
import * as React from 'react';

import { Layout } from './containers/Layout/Layout';
import { IProduct } from './containers/Products/components/Product';
import { Products } from './containers/Products/Products';
import { SearchArea } from './containers/Search/SearchArea';
import { dummyData } from './mock/mockData';

interface IAppState {
  products: IProduct[];
}

class App extends React.Component<{}, IAppState> {
  public state = {
    products: dummyData,
  }
  public componentDidMount() {
    axios.get('http://localhost:8080/webshop_web_war_exploded/product')
      .then((res) => {
        this.setState({products: res.data.products});
      })
      .catch((err) => console.log(err));
  }
  public render() {
    return (
      <div>
        <Layout data={35}>
          <SearchArea />
          {/* { this.products
            ? <Products productList={this.products} />
            : <Products productList={dummyData} />} */}
          <Products productList={this.state.products} />
        </Layout>
      </div>
    );
  }
}

export default App;
