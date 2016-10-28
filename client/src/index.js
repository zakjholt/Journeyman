import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import './stylesheets/main.css';

// redux
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);
