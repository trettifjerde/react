import { configureStore, createSlice } from '@reduxjs/toolkit';
import { recipesReducer } from './recipesState';
import { shoppingListReducer } from './shoppingListState';

const general = createSlice({
    name: 'general',
    initialState: {error: null},
    reducers: {
        announceError(state, action) {
            state.error = action.payload
        },
    }
});

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        shoppingList: shoppingListReducer,
        general: general.reducer
    }
});

export const generalActions = general.actions;