import { NavLink } from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/products">Products</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;