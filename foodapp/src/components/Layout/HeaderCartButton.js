import { useEffect, useState } from 'react';
//import CartContext from '../../store/CartContext';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { cartActions } from '../../store/redux';
import { useSelector, useDispatch } from 'react-redux';

const HeaderCartButton = () => {
    console.log('HeaderCartButton');
    //const {toggleCartVisibility, items} = useContext(CartContext);
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const [btnClassname, setBtnClassname] = useState(classes.button); 

    const handleToggleVisibility = () => {
        dispatch(cartActions.toggleCartVisibility());
    }

    useEffect(() => {
        if (items.length === 0)
            return;

        setBtnClassname(`${classes.button} ${classes.bump}`);
        const timer = setTimeout(() => setBtnClassname(`${classes.button}`), 300);
        return () => clearTimeout(timer);
    }, [items]);

    return (
        <button className={btnClassname} onClick={handleToggleVisibility}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{items.length}</span>
        </button>
    )
}
export default HeaderCartButton;