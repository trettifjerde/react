import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cartStore';

function App() {
  const cart = useSelector(state => state.cart);
  const cartVisible = useSelector(state => state.ui.cartVisible);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (cart.changed)
      dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} message={notification.message} />}
      <Layout>
        { cartVisible && <Cart /> }
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;
