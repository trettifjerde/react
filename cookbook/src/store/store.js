import { configureStore } from '@reduxjs/toolkit';
import { generalReducer } from './generalState';
import { recipesReducer } from './recipesState';
import { shoppingListReducer } from './shoppingListState';

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        shoppingList: shoppingListReducer,
        general: generalReducer
    }
});