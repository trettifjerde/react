import classes from './Cart.module.css';
import {Fragment, useCallback, useEffect, useState} from 'react';
import ReactDOM  from 'react-dom';
import Modal from '../UI/Modal';
//import CartContext from '../../store/CartContext';
import CartForm from './CartForm';
import CartList from './CartList';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/redux';

const Cart = () => {
    console.log('Cart');
    //const {isCartVisible, items, totalAmount, toggleCartVisibility, addItemToCart, removeItemFromCart, emptyCart} = useContext(CartContext);
    const {items, totalAmount, isCartVisible} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [isFormVisible, setFormVisible] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const onCartHide = useCallback(() => dispatch(cartActions.toggleCartVisibility()), [dispatch]);

    const addItemToCart = (item, amount) => dispatch(cartActions.addItemToCart({item, amount}));
    const removeItemFromCart = (id, amount) => dispatch(cartActions.removeItemFromCart({id, amount}))

    const handleOrderBtnClick = useCallback(() => {
        setFormVisible(true)
    }, [setFormVisible]);

    const onOrderSubmit = (orderId) => {
        setOrderId(orderId);
        dispatch(cartActions.emptyCart());
    };

    const onOrderCancel = () => {
        setFormVisible(false);
        dispatch(cartActions.toggleCartVisibility());
    };

    const onMakeANewOrder = () => {
        setOrderId(null);
        dispatch(cartActions.toggleCartVisibility());
    };

    useEffect(() => {
        if (items.length === 0) {
            setFormVisible(false);
        }
    }, [items]);

    return (
        <Fragment>
            { ReactDOM.createPortal(
                <Modal isVisible={isCartVisible} hide={onCartHide} title="Cart" className={classes.cart}>
                    
                    {! orderId && ! isFormVisible && <CartList items={items} totalAmount={totalAmount} 
                        onCartHide={onCartHide} handleOrderBtnClick={handleOrderBtnClick}
                        addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart}
                    />}

                    { !orderId && isFormVisible && <CartForm items={items} totalAmount={totalAmount} 
                        onOrderSubmit={onOrderSubmit} onOrderCancel={onOrderCancel} />}
                
                    { orderId && (<div className='c'>
                        <h2>Success!</h2>
                        <p>Your order has been submitted under ID <span className='b'>{orderId}</span>.</p>
                        <p> Additional information has been sent to your email.</p>
                        <button onClick={onMakeANewOrder}>Continue ordering</button>
                        </div>)
                    }
                </Modal>,
                document.getElementById('cart')
            )}
        </Fragment>
    )
}
export default Cart;