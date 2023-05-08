import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { store } from '../store/store';
import { shoppingListActions } from "../store/shoppingListState";
import { fetchIngredients } from "../helpers/dataService";
import { authGuard } from "../helpers/authService";
import { generalActions } from "../store/generalState";
import useRedirectOnLogout from "../helpers/useRedirectOnLogout";
import { prepareIngredientSubmit } from "../helpers/utils"; 

import EmptyComponent from "../components/Empty";
import Spinner from "../components/Spinner";
import ShoppingList from "../components/shopping/ShoppingList";
import ShoppingListForm from "../components/shopping/ShoppingListForm";

const ShoppingListPage = () => {
    const {shoppingList} = useLoaderData();
    useRedirectOnLogout();

    return (
        <div className="row mb-4 fadeIn">
            <div className="col-xs-10">
                <ShoppingListForm />
                <hr/>
                <Suspense fallback={<Spinner />}>
                    <Await resolve={shoppingList} errorElement={<EmptyComponent message="Failed to load your shopping list"/>}>
                        <ShoppingList />
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}
export default ShoppingListPage;

export async function loader({request, params}) {
    return authGuard() || defer({shoppingList: loadShoppingList()});
}

async function loadShoppingList() {
    const state = store.getState().shoppingList;

    if (state.isInitialized) {
        return state.items;
    }

    const response = await fetchIngredients();

    if ('error' in response) throw new Error();

    store.dispatch(shoppingListActions.initializeItems(response));
    
    return response;
}

export async function action({request, params}) {
    const dispatch = store.dispatch;
    
    dispatch(generalActions.setSubmitting(true));

    const items = store.getState().shoppingList.items;
    const formData = await request.formData();

    const [submitFn, message] = prepareIngredientSubmit(formData, items);

    if (!submitFn) {
        dispatch(generalActions.flashToast({text: message, isError: true}));
        return;
    }

    const res = await submitFn();
    if ('error' in res) 
        dispatch(generalActions.flashToast({text: res.error.message, isError: true}));
    else {
        dispatch(shoppingListActions.updateItem(res));
        dispatch(shoppingListActions.clearItem());
        dispatch(generalActions.flashToast({text: message, isError: false}))
    }
    return null;
}