import 'babel-polyfill';
import 'es6-promise';
import 'whatwg-fetch';
import './styles/styles.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('App')
);