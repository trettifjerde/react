import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "../helpers/authService";

const initialState = {
    isSubmitting: false,
    error: null,
    user: null // or {token: string, expires: number, timer: number}
};

const general = createSlice({
    name: 'general',
    initialState,
    reducers: {
        announceError(state, action) {
            state.error = action.payload;
            state.isSubmitting = false;
        },
        logIn(state, action) {
            state.user = action.payload; // {token: string, timer: number, expires: number}
            state.error = null;
            state.isSubmitting = false;
        },
        logOut(state) {
            state.user = null;
            state.error = null;
        },
        setSubmitting(state, action) {
            console.log(action.payload);
            state.isSubmitting = action.payload;
        }
    }
});

export const generalReducer = general.reducer;
export const generalActions = general.actions;

export function registerLogIn(tokenInfo) {
    return (dispatch) => {
        const expiresIn = tokenInfo.expires - new Date().getTime();
        const timer = setTimeout(() => {
            console.log('timer fired!');
            dispatch(registerLogOut(timer));
        }, expiresIn);
        dispatch(generalActions.logIn({...tokenInfo, timer}))
    }
}

export function registerLogOut(timer) {
    return (dispatch) => {
        clearTimeout(timer);
        removeToken();
        dispatch(generalActions.logOut());
    }
}