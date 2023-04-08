import { removeToken } from "../helpers/authService";
import { generalActions } from "./generalState";
import { shoppingListActions } from "./shoppingListState";
import { addIngredient } from "../helpers/dataService";
import { makeDBItemFromShoppingListIngred } from "../helpers/utils";
import { store } from "./store";

export function registerLogIn(token) {
    return (dispatch) => {
        const expiresIn = new Date(token.expirationDate).getTime() - new Date().getTime();
        console.log(expiresIn);
        const timer = setTimeout(() => {
            dispatch(registerLogOut(timer));
        }, expiresIn);
        dispatch(generalActions.logIn({...token, timer}))
    }
}

export function registerLogOut(timer) {
    return (dispatch) => {
        clearTimeout(timer);
        removeToken();
        dispatch(shoppingListActions.clearIngredients());
        dispatch(generalActions.logOut());
    }
}

export function addRecipeToShoppingList(items) {
    return async (dispatch) => {
        dispatch(generalActions.setSubmitting(true));

        const shoppingList = store.getState().shoppingList.items;
        const itemsToAdd = [];
        const itemsToUpdate = [];

        items.forEach(item => {
            const existingItem = shoppingList.find(i => i.name === item.name && i.unit === item.unit);
            if (existingItem)
                itemsToUpdate.push({...existingItem, amount: (+existingItem.amount) + (+item.amount)});
            else 
                itemsToAdd.push({...makeDBItemFromShoppingListIngred(item), id: null});
        });

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
            itemsToAdd[i].id = res.name;
        }

        dispatch(shoppingListActions.addIngredientsFromRecipe({itemsToAdd, itemsToUpdate}));
        dispatch(generalActions.flashToast({text: 'Recipe ingredients added to shop list', isError: false}));
    }
}