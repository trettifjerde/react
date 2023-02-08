import { createContext, useState, useReducer } from "react";
import { cartActions, cartReducer, cartInitialState } from './CartReducer';

const CartContext = createContext({
    isCartVisible: false,
    items: {},
    totalAmount: 0,
    toggleCartVisibility: () => {},
    addItem: () => {},
    removeItem: () => {}

});

export const CartContextProvider = (props) => {
    const [state, dispatchState] = useReducer(cartReducer, cartInitialState);
    const [isCartVisible, setCartVisibility] = useState(false);

    const {totalAmount, items} = state;

    const toggleCartVisibility = (flag) => setCartVisibility(flag);
    const addItem = (item, amount) => dispatchState({type: cartActions.ADD_ITEM, payload: {itemToAdd: item, amount: amount}});
    const removeItem = (item, amount) => dispatchState({type: cartActions.REMOVE_ITEM, payload: {itemToRemove: item, amount: amount}});

    return (
        <CartContext.Provider 
            value={{
                isCartVisible: isCartVisible, 
                totalAmount: totalAmount,
                items: items,
                toggleCartVisibility: toggleCartVisibility,
                removeItem: removeItem,
                addItem: addItem
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;