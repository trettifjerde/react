import { createContext, useState, useReducer } from "react";
import { cartActions, cartReducer, cartInitialState } from './CartReducer';

const CartContext = createContext({
    isCartVisible: false,
    items: {},
    totalAmount: 0,
    toggleCartVisibility: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {}

});

export const CartContextProvider = (props) => {
    const [state, dispatchState] = useReducer(cartReducer, cartInitialState);
    console.log(state);
    const [isCartVisible, setCartVisibility] = useState(false);

    const {totalAmount, items} = state;

    const toggleCartVisibility = (flag) => setCartVisibility(flag);
    const addItemToCart = (item, amount) => dispatchState({type: cartActions.ADD_ITEM, payload: {...item, amount: amount}});
    const removeItemFromCart = (itemId, amount) => dispatchState({type: cartActions.REMOVE_ITEM, payload: {id: itemId, amount: amount}});

    return (
        <CartContext.Provider 
            value={{
                isCartVisible: isCartVisible, 
                totalAmount: totalAmount,
                items: items,
                toggleCartVisibility: toggleCartVisibility,
                removeItemFromCart: removeItemFromCart,
                addItemToCart: addItemToCart
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;