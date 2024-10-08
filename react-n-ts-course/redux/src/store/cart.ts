import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
}

type CartState = {
    items: CartItem[]
}

const initialState : CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addToCart(state, {payload : itemInfo}: PayloadAction<Omit<CartItem, 'quantity'>>) {
            const index = state.items.findIndex(item => item.id === itemInfo.id);

            if (index >= 0)
                state.items[index].quantity++;
            else
                state.items.push({
                    ...itemInfo,
                    quantity: 1
                });
        },
        removeFromCart(state, {payload : id}: PayloadAction<string>) {
            const index = state.items.findIndex(item => item.id === id);
            
            if (index === -1)
                return;

            const item = state.items[index];

            if (item.quantity === 1)
                state.items.splice(index, 1);
            else
                item.quantity--;
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;