import React from 'react';
import ReactDOM from 'react-dom';
import  store  from './advancedRedux/store/store';

import { Provider } from 'react-redux';

import App from './advancedRedux/App';
import './advancedRedux/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
    <Provider store={store}>
        <App />
  </Provider>
  )