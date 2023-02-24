import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ingredients: [],
    isInitialized: false
}

const slice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        initializeIngredients(state, action) {
            state.ingredients = action.payload;
            state.isInitialized = true;
        }
    }
});

export const shoppingListReducer = slice.reducer;
export const shoppingListActions = slice.actions;