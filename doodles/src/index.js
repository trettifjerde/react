import React from 'react';
import ReactDOM from 'react-dom/client';
//import  store  from './advancedRedux/store/store';

//import { Provider } from 'react-redux';

import App from './routerApp/App';
import './routerApp/index.css';

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
    <Provider store={store}>
        <App />
  </Provider>
  )*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
        <App />
)
