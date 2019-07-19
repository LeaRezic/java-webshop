import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Notifications from 'react-notify-toast';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { ErrorBoundary } from './components/AppError/ErrorBoundary';

const app =
<Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <Notifications />
        <App />
      </BrowserRouter>
    </ErrorBoundary>
</Provider>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
