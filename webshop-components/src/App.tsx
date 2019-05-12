import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Layout } from './hoc/Layout/Layout';
import { ProductsPage } from './containers/ProductsPage/ProductsPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <ProductsPage />
      </Layout>
    </div>
  );
}

export default App;
