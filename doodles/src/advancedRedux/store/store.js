import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartStore";
import { productsReducer } from "./productsStore";
import { uiReducer } from "./ui";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        ui: uiReducer
    }
});

export default store;