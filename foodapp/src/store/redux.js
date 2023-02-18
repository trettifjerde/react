import {configureStore, createSlice} from '@reduxjs/toolkit';

const roundFloat = (n) => Math.round(n * 100 + Number.EPSILON ) / 100;

const initialState = {
    isCartVisible: false,
    items: [],
    totalAmount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCartVisibility(state) {state.isCartVisible = !state.isCartVisible},
        addItemToCart(state, action) {
            const {item: itemToAdd, amount} = action.payload;
            const itemI = state.items.findIndex(i => i.id === itemToAdd.id);

            if (itemI === -1) {
                state.items.push({...itemToAdd, amount: amount});
            }
            else {
                state.items[itemI].amount += amount;
            }

            state.totalAmount = roundFloat(state.totalAmount + itemToAdd.price * amount);
        },
        removeItemFromCart(state, action) {
            const { id, amount } = action.payload;
            const itemI = state.items.findIndex(item => item.id === id);
            const existingItem = state.items[itemI];
    
            if (existingItem.amount === amount) {
                state.items.splice(itemI, 1);
            }
            else {
                state.items[itemI].amount -= amount;
            }
    
            state.totalAmount = roundFloat(state.totalAmount - existingItem.price * amount);
        },
        emptyCart(state) {
            state.items = []; 
            state.totalAmount = 0;
        }
    }
})

export const store = configureStore({
    reducer: {cart: cartSlice.reducer}
})

export const cartActions = cartSlice.actions;