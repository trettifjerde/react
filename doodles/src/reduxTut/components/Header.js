import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { authActions } from '../store/toolkitStore';

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  console.log('Header');

  const handleLogout = () => {
    dispatch(authActions.logOut());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          { isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;