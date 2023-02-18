import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui';

const CartButton = (props) => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleToggleCart = () => dispatch(uiActions.toggleCart());

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
};

export default CartButton;
