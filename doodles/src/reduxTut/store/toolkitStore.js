import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialCounterState = {counter: 0, visible: true};
const initialAuthState = {isLoggedIn: false};

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {state.counter++},
        decrement(state) {state.counter--}, 
        increase(state, action) {state.counter = state.counter + action.payload},
        toggleVisibility(state) {state.visible = !state.visible}
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        logIn(state) {state.isLoggedIn = true},
        logOut(state) {state.isLoggedIn = false}
    }
});

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer
    }
})

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;