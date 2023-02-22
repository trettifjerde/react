import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from './recipesState';

export const store = configureStore({
    reducer: {
        recipes: recipesReducer
    }
});