import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "mobx-react";
import App from './App'
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApiService from './services/api.service'
import store from './store'

ApiService.init()

ReactDOM.render(
  <Provider {...store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
