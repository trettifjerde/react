import { createSlice } from '@reduxjs/toolkit';
import  { uiActions } from './ui';

const initialCartState = {
    items: [],
    totalAmount: 0,
    changed: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart(state, action) { 
            const {item, amount} = action.payload;
            const existingItem = state.items.find(it => it.id === item.id);

            if (existingItem) {
                existingItem.amount += amount;
            }
            else {
                state.items.push({...item, amount})
            }

            state.totalAmount += item.price * amount;
            state.changed = true;
        },
        removeFromCart(state, action) { 
            const {id, amount} = action.payload;
            const i  = state.items.findIndex(it => it.id === id);
            const item = state.items[i];

            if (item.amount === amount) {
                state.items.splice(i, 1);
            }
            else {
                item.amount -= amount;
            }
            state.totalAmount -= item.price * amount;
            state.changed = true;
        },
        setCart(state, action) {
            const { totalAmount, items, changed } = action.payload;
            state.totalAmount = totalAmount;
            state.items = items;
            state.changed = changed;
        }
    }
});

const sendRequest = async (body) => {
    const config = ['https://academind34-default-rtdb.europe-west1.firebasedatabase.app/cart.json'];
    if (body) {
        config.push({
            method: 'PUT',
            body: JSON.stringify(body),
            headers : {'Content-Type': 'application/json'}
        });
    }
    return await fetch(...config)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error();
            }
        })
        .catch(err => {
            return false
        });
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            message: 'Sending cart data', 
            status: 'pending'
          }));

        if (await sendRequest(cart)) {
            dispatch(uiActions.showNotification({
                message: 'Cart data updated', 
                status: 'success'
            }));
        }
        else {
            dispatch(uiActions.showNotification({
                message: 'Failed to update cart. Try again later',
                status: 'error'
            }))
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            message: 'Fetching cart',
            status: 'pending'
        }));

        const data = await sendRequest();
        if (data) {
            dispatch(uiActions.showNotification({
                message: 'Cart is fetched!',
                status: 'success'
            }));
            const cart = {
                items: data.items ? data.items : [],
                totalAmount: data.totalAmount,
                changed: false
            };
            dispatch(cartActions.setCart(cart));
        }
        else {
            dispatch(uiActions.showNotification({
                message: 'Failed to fetch cart. Try again later',
                status: 'error'
            }))
        }
    }
}

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;