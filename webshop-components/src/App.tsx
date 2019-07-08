import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import './App.css';

import { Layout } from './hoc/Layout/Layout';
import { ShoppingPage } from './containers/Shop/ShoppingPage';
import { LoginPage } from './containers/Auth/LoginPage';
import { CheckoutPage } from './containers/Checkout/CheckoutPage';
import { ProfilePage } from './containers/Profile/ProfilePage';
import { AdminPage } from './containers/Admin/AdminPage';

class App extends React.Component<RouteComponentProps, {}> {
  render() {
    const isAuth = true;
    const isAdmin = true;
    let routes = (
      <Switch>
        <Route path='/auth' component={LoginPage} />
        <Route exact path='/products' component={ShoppingPage} />
        <Redirect to='/products' />
      </Switch>
    );
    if (isAuth) {
      routes = (
        <Switch>
          <Route path='/auth' component={LoginPage} />
          <Route exact path='/products' component={ShoppingPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path='/profile' component={ProfilePage} />
          <Redirect to='/products' />
        </Switch>
      );
    }
    if (isAuth && isAdmin) {
      routes = (
        <Switch>
          <Route path='/auth' component={LoginPage} />
          <Route exact path='/admin' component={AdminPage} />
          <Route exact path='/products' component={ShoppingPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path='/profile' component={ProfilePage} />
          <Redirect to='/products' />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
