import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  let content = <p>Cart is empty</p>

  if (items.length > 0) {
    content = <ul>{items.map(item => <CartItem key={item.id} item={item}/>)}</ul>;
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {content}
    </Card>
  );
};

export default Cart;
