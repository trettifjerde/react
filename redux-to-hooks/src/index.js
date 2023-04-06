import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import './index.css';
import productReducer from './store/reducers/products';
import App from './App';
import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';

const rootReducer = combineReducers({
  shop: productReducer
});

const store = createStore(rootReducer);

const routes = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <ProductsPage /> },
    { path: 'favorites', element: <FavoritesPage /> }
  ]}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
</Provider>
);