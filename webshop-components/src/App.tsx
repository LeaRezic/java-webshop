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
import { ProductViewPage } from './containers/ProductView/ProductViewPage';
import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector, isAdminSelector } from './containers/Auth/state/selectors';
import { connect } from 'react-redux';

export interface IAppAuthProps {
  isAuth: boolean;
  isAdmin: boolean;
}

class App extends React.Component<RouteComponentProps & IAppAuthProps, {}> {
  render() {
    const { isAuth, isAdmin } = this.props;
    let routes = (
      <Switch>
        <Route path='/auth' component={LoginPage} />
        <Route exact path='/products' component={ShoppingPage} />
        <Route exact path='/products/:id' component={ProductViewPage} />
        <Redirect to='/products' />
      </Switch>
    );
    if (isAuth && !isAdmin) {
      routes = (
        <Switch>
          <Route path='/auth' component={LoginPage} />
          <Route exact path='/products' component={ShoppingPage} />
          <Route exact path='/products/:id' component={ProductViewPage} />
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
          <Redirect to='/admin' />
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

const mapStateToProps = createStructuredSelector<any, IAppAuthProps>({
  isAuth: isAuthenticatedSelector,
  isAdmin: isAdminSelector,
})

export default withRouter(connect(mapStateToProps)(App));
