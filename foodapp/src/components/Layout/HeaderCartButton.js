import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/CartContext';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
    console.log('HeaderCartButton');
    const {toggleCartVisibility, items} = useContext(CartContext);
    const [btnClassname, setBtnClassname] = useState(classes.button); 

    useEffect(() => {
        if (items.length === 0)
            return;

        setBtnClassname(`${classes.button} ${classes.bump}`);
        const timer = setTimeout(() => setBtnClassname(`${classes.button}`), 300);
        return () => clearTimeout(timer);
    }, [items]);


    return (
        <button className={btnClassname} onClick={() => toggleCartVisibility(true)}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{items.length}</span>
        </button>
    )
}
export default HeaderCartButton;