import { createSlice } from "@reduxjs/toolkit";
import { addIngredient } from "../helpers/dataService";
import { generalActions } from "./generalState";
import { store } from "./store";

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
            state.items = action.payload.reverse();
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
            state.items = [item, ...state.items.filter(i => i.id !== item.id)];
            state.selectedItem = {...emptyItem};
        },
        deleteItem(state, action) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        addIngredientsFromRecipe(state, action) {
            const {itemsToAdd, itemsToUpdate} = action.payload;
            const updatedItemsIDs = itemsToUpdate.map(item => item.id);
            
            state.items = state.items.filter(item => !updatedItemsIDs.includes(item.id))
                .concat(itemsToUpdate)
                .concat(itemsToAdd);
        }
    }
});

export const shoppingListReducer = slice.reducer;
export const shoppingListActions = slice.actions;

export function addRecipeToShoppingList(items) {
    return async (dispatch) => {
        dispatch(generalActions.setSubmitting(true));

        const shoppingList = store.getState().shoppingList.items;
        const itemsToAdd = [];
        const itemsToUpdate = [];

        items.forEach(item => {
            console.log(item);
            const existingItem = shoppingList.find(i => i.name === item.name && i.unit === item.unit);
            if (existingItem)
                itemsToUpdate.push({...existingItem, amount: (+existingItem.amount) + (+item.amount)});
            else 
                itemsToAdd.push({...item, id: null});
        });

        console.log(itemsToAdd, itemsToUpdate);

        for (const item of itemsToUpdate) {
            const {id, ...ingred} = item;
            const res = await addIngredient(ingred, id);
            if ('error' in res) {
                dispatch(generalActions.flashToast({text: res.error.message, isError: true}));
                break;
            }
        }

        for (let i = 0; i < itemsToAdd.length; i++) {
            const {id, ...ingred} = itemsToAdd[i];
            const res = await addIngredient(ingred, id);
            if ('error' in res) {
                dispatch(generalActions.flashToast({text: res.error.message, isError: true}));
                break;
            }
            itemsToAdd[i].id = res.id;
        }
        

        dispatch(shoppingListActions.addIngredientsFromRecipe({itemsToAdd, itemsToUpdate}));
        dispatch(generalActions.flashToast({text: 'Recipe ingredients added to shop list', isError: false}));
    }
}