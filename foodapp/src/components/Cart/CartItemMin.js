import classes from './CartItemMin.module.css';

const CartItemMin = (props) => {

    return(
    <li className={classes['cart-item']}>
          <p>{props.item.name}</p>
          <div className={classes.summary}>
            <span className={classes.price}>{`$${props.item.price}`}</span>
            <span className={classes.amount}>x {props.item.amount}</span>
          </div>
      </li>
    )

}

export default CartItemMin;