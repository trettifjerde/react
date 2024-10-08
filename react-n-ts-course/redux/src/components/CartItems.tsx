import { cartActions, CartItem } from "../store/cart";
import { useStoreDispatch, useStoreSelector } from "../store/store";

export default function CartItems() {
  const {items: cartItems} = useStoreSelector(state => state.cart);
  const dispatch = useStoreDispatch();

  const formattedTotalPrice = `$${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`;

  const handleAddToCart = (item: CartItem) => dispatch(cartActions.addToCart(item)); 
  const handleRemoveFromCart = (id: string) => dispatch(cartActions.removeFromCart(id));

  return (
    <div id="cart">
      {!cartItems.length && <p>No items in cart!</p> }

      <ul id="cart-items">
        {cartItems.map((item) => {
          const formattedPrice = `$${item.price.toFixed(2)}`;

          return (
            <li key={item.id}>
              <div>
                <span>{item.title}</span>
                <span> ({formattedPrice})</span>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAddToCart(item)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>

      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
