import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';

import configureProductsStore from './hooksstore/products-store';

configureProductsStore();

const routes = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <ProductsPage /> },
    { path: 'favorites', element: <FavoritesPage /> }
  ]}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={routes}/>);