import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    recipes: [],
    error: null,
    isInitialized: false,
    isSubmitting: false
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setInitialRecipes(state, action) {
            state.recipes.push(...action.payload);
            state.isInitialized = true;
            state.error = null;
        },
        setFetchedRecipes(state, action) {
            state.recipes.push(...action.payload);
            state.error = null;
        },
        announceError(state, action) {
            state.error = action.payload;
        },
        setSubmittingStatus(state, action) {
            state.isSubmitting = action.payload;
        }
    }
});

export const recipesReducer = recipesSlice.reducer;
export const recipesActions = recipesSlice.actions;