import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartContextProvider } from './store/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartContextProvider>
      <App />
    </CartContextProvider>
);