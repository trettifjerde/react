import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import './Header.css';
import mealsImage from '../../assets/meals.jpg';


const Header = () => {
    console.log('Header');
    return (
        <Fragment>
            <header className='header'>
                <h1>React Meals</h1>
                <HeaderCartButton />
            </header>
            <div className='main-image'>
                <img src={mealsImage} alt="Table full of food" />
            </div>
        </Fragment>
    )
}

export default Header;