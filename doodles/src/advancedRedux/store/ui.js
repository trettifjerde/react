import { createSlice } from '@reduxjs/toolkit';

const initialUiState = {
    cartVisible: false,
    notification: null
};

const uiSlice = createSlice({
    name: 'cart',
    initialState: initialUiState,
    reducers: {
        toggleCart(state) { state.cartVisible = ! state.cartVisible},
        showNotification(state, action) { 
            state.notification = { status: action.payload.status, message: action.payload.message };
        }
    }
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;