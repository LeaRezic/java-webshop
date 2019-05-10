import * as React from 'react';

import { Layout } from './containers/Layout/Layout';
import { Products } from './containers/Products/Products';
import { SearchArea } from './containers/Search/SearchArea';
import { dummyData } from './mock/mockData';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Layout data={35}>
          <SearchArea />
          <Products productList={dummyData} />
        </Layout>
      </div>
    );
  }
}

export default App;
