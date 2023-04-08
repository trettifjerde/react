import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "../helpers/authService";

const initialState = {
    isSubmitting: false,
    message: null, // or {text: string, isError: boolean}
    user: null // or {token: string, id: string, expirationDate: isostring, email: string, timer: number}
};

const general = createSlice({
    name: 'general',
    initialState,
    reducers: {
        flashToast(state, action) {
            state.message = action.payload;
            state.isSubmitting = false;
        },
        logIn(state, action) {
            state.user = action.payload; // {token: string, timer: number, expires: number}
            state.message = null;
            state.isSubmitting = false;
        },
        logOut(state) {
            state.user = null;
            state.message = {text: "You've been logged out", isError: false};
        },
        setSubmitting(state, action) {
            state.isSubmitting = action.payload;
        }
    }
});

export const generalReducer = general.reducer;
export const generalActions = general.actions;

export function registerLogIn(token) {
    return (dispatch) => {
        const expiresIn = new Date(token.expirationDate).getTime() - new Date().getTime();
        console.log(expiresIn);
        const timer = setTimeout(() => {
            dispatch(registerLogOut(timer));
        }, expiresIn);
        dispatch(generalActions.logIn({...token, timer}))
    }
}

export function registerLogOut(timer) {
    return (dispatch) => {
        clearTimeout(timer);
        removeToken();
        dispatch(generalActions.logOut());
    }
}