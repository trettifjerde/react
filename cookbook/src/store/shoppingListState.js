import { createSlice } from "@reduxjs/toolkit";

const emptyItem = {name: '', amount: '', unit: '', id: null}

const initialState = {
    items: [],
    selectedItem: {...emptyItem},
    isInitialized: false
}

const slice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        initializeItems(state, action) {
            state.items = sortIngreds(action.payload);
            state.isInitialized = true;
        },
        selectItem(state, action) {
            const item = action.payload;
            state.selectedItem = {
                name: item.name,
                id: item.id,
                amount: item.amount || '',
                unit: item.unit || ''
            };
        },
        clearItem(state) {
            state.selectedItem = {...emptyItem};
        },
        updateItem(state, action) {
            const item = action.payload;
            state.items = sortIngreds([...state.items.filter(i => i.id !== item.id), item]);
            state.selectedItem = {...emptyItem};
        },
        deleteItem(state, action) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        addIngredientsFromRecipe(state, action) {
            state.items = sortIngreds(action.payload);
        },
        clearIngredients(state) {
            return initialState;
        }
    }
});

export const shoppingListReducer = slice.reducer;
export const shoppingListActions = slice.actions;

function sortIngreds(ingreds) {
    let sorted = [...ingreds];
    sorted.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    return sorted;
}