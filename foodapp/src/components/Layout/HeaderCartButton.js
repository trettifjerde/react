import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const {toggleCartVisibility, items} = useContext(CartContext);

    return (
        <button className={classes.button} onClick={() => toggleCartVisibility(true)}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{items.length}</span>
        </button>
    )
}
export default HeaderCartButton;