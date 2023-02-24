import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    recipes: [],
    cache: {},
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
        },
        addRecipe(state, action) {
            const recipe = action.payload;

            state.recipes.push(recipe);
            state.cache[recipe.id] = recipe;
            state.error = null;
        },
        updateRecipe(state, action) {
            const recipe = action.payload;

            state.recipes = [...state.recipes.filter(r => r.id !== recipe.id), recipe];
            state.cache[recipe.id] = recipe;
            state.error = null;
        },
        deleteRecipe(state, action) {
            const id = action.payload;
            state.recipes = state.recipes.filter(r => r.id !== id);
            delete state.cache[id];
            state.error = null;
        },
        saveRecipeInCache(state, action) {
            state.cache[action.payload.id] = action.payload.recipe;
        }
    }
});

export const recipesReducer = recipesSlice.reducer;
export const recipesActions = recipesSlice.actions;