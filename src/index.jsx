//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
//  css
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
//  redux
import store from './store';
import App from './components/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);