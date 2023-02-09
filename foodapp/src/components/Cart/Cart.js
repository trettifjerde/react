import './Cart.css';
import {Fragment, useContext} from 'react';
import ReactDOM  from 'react-dom';
import Modal from '../UI/Modal';
import CartContext from '../../store/CartContext';
import CartItem from './CartItem';

const Cart = () => {
    const {isCartVisible, items, totalAmount, toggleCartVisibility, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const onCartHide = () => toggleCartVisibility(false);

    return (
        <Fragment>
            { ReactDOM.createPortal(
                <Modal isVisible={isCartVisible} hide={onCartHide} title="Cart">
                    <ul className='cart-items'>
                        { 
                            items.map(item => (
                                <CartItem key={item.id} item={item} 
                                    onRemove={removeItemFromCart.bind(null, item.id, 1)} 
                                    onAdd={addItemToCart.bind(null, item, 1)} 
                                />
                            ))
                        }
                    </ul>
                    <div className='total'>
                        <span>Total Amount</span>
                        <span>{`$${totalAmount}`}</span>
                    </div>
                    <div className='actions'>
                        <button className='button--alt' type="button" onClick={onCartHide}>Close</button>
                        <button className='button'>Order</button>
                    </div>
                </Modal>,
                document.getElementById('cart')
            )}
        </Fragment>
    )
}
export default Cart;