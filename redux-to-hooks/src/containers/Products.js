import React from 'react';

import ProductItem from '../components/Products/ProductItem';
import useStore from '../hooksstore/store';
import './Products.css';

const Products = props => {
  const state = useStore()[0];

  console.log('Products');
  
  const productList = state.products;

  return (
    <ul className="products-list">
      {productList.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
