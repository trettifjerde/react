import { removeToken } from "../helpers/authService";
import { generalActions } from "./generalState";
import { shoppingListActions } from "./shoppingListState";
import { updateIngredients } from "../helpers/dataService";
import { castIngredClientToDb, castRecipeIngredsToClient } from "../helpers/utils";
import { store } from "./store";

export function registerLogIn(token) {
    return (dispatch) => {
        const expiresIn = new Date(token.expirationDate).getTime() - new Date().getTime();
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

        const ingreds = castRecipeIngredsToClient(items);
        const shoppingList = store.getState().shoppingList.items;
        const updatedShoppingList = [...shoppingList];

        ingreds.forEach(item => {
            const i = shoppingList.findIndex(it => it.name === item.name && it.unit === item.unit);
            if (i > -1) {
                const existingItem = shoppingList[i];
                updatedShoppingList[i] = {...existingItem, amount: (+existingItem.amount) + (+item.amount)};
            }
            else 
                updatedShoppingList.push({...castIngredClientToDb(item), id: null});
        });

        const res = await updateIngredients(updatedShoppingList);
        if ('error' in res) {
            dispatch(generalActions.flashToast({text: res.error.message, isError: true}));
        }
        else {
            dispatch(shoppingListActions.addIngredientsFromRecipe(res));
            dispatch(generalActions.flashToast({text: 'Recipe ingredients added to shopping list', isError: false}));
        }
    }
}