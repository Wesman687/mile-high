import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faCartShopping, faShoppingCart, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import store from './redux/store.js'
import { Provider } from 'react-redux'

library.add(faBars, faShoppingCart, faCartShopping, faSpinner, faTimes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />    
    </Provider>
);


