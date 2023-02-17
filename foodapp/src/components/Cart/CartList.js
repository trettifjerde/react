import { Fragment } from "react";
import classes from './Cart.module.css';
import CartItem from './CartItem';

const CartList = (props) => {
    const { 
        items, 
        totalAmount, 
        onCartHide, 
        handleOrderBtnClick,
        removeItemFromCart,
        addItemToCart 
    } = props;

    console.log('CartList');

    return (
        <Fragment>
            <ul className={classes['cart-items']}>
                { 
                    items.map(item => (
                        <CartItem key={item.id} item={item} 
                            onRemove={removeItemFromCart.bind(null, item.id, 1)} 
                            onAdd={addItemToCart.bind(null, item, 1)} 
                        />
                    ))
                }
            </ul>

            <div className={classes['total']}>
                <span>Total</span>
                <span>{`$${totalAmount}`}</span>
            </div>

            <div className='c'>
                <button className='alt' type="button" onClick={onCartHide}>Close</button>
                <button disabled={items.length === 0} onClick={handleOrderBtnClick}>Order</button>
            </div>
        </Fragment>
    )
}

export default CartList;