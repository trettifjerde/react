import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './reduxTut/App';
import { store } from './reduxTut/store/toolkitStore';
import './reduxTut/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>

)