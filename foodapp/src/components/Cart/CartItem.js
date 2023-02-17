import classes from './CartItem.module.css';

const CartItem = (props) => {
  console.log('cart item');
  const price = `$${props.item.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button className='alt' onClick={props.onRemove}>−</button>
        <button className='alt' onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
