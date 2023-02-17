import classes from './Cart.module.css';
import {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import ReactDOM  from 'react-dom';
import Modal from '../UI/Modal';
import CartContext from '../../store/CartContext';
import CartForm from './CartForm';
import CartList from './CartList';

const Cart = () => {
    console.log('Cart');
    const {isCartVisible, items, totalAmount, toggleCartVisibility, addItemToCart, removeItemFromCart, emptyCart} = useContext(CartContext);
    const [isFormVisible, setFormVisible] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const onCartHide = useCallback(() => toggleCartVisibility(false), [toggleCartVisibility]);

    const handleOrderBtnClick = useCallback(() => {
        setFormVisible(true)
    }, [setFormVisible]);

    const onOrderSubmit = useCallback((orderId) => {
        setOrderId(orderId);
        emptyCart();
    }, [emptyCart]);

    const onOrderCancel = useCallback(() => {
        setFormVisible(false);
        onCartHide();
    }, [onCartHide]);

    const onMakeANewOrder = useCallback(() => {
        setOrderId(null);
        toggleCartVisibility(false);
    }, [toggleCartVisibility]);

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