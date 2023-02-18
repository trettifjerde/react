import classes from './CartItem.module.css';

import {useDispatch} from 'react-redux';
import { cartActions } from '../../store/cartStore';

const CartItem = (props) => {
  const { item } = props;
  const { id, title, amount, price } = item;
  const dispatch = useDispatch();

  const handleAdd = () => dispatch(cartActions.addToCart({item, amount: 1}));
  const handleRemove = () => dispatch(cartActions.removeFromCart({id, amount: 1}));

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          <div>${amount * price}</div>
          <div className={classes.itemprice}>${price}/item</div>
        </div>
      </header>
      <div className={classes.details}>
      <div className={classes.quantity}>
          x <span>{amount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemove}>-</button>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
