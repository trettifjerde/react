//import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import { CartContextProvider } from './store/CartContext';
import { Provider } from 'react-redux';
import { store } from './store/redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*root.render(
    <CartContextProvider>
      <App />
    </CartContextProvider>
);*/
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)