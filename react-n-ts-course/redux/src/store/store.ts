import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

type StoreDispatch = typeof store.dispatch;

export const useStoreSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useStoreDispatch : () => StoreDispatch = useDispatch;