import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { store } from '../store/store';
import { shoppingListActions } from "../store/shoppingListState";
import { fetchIngredients } from "../helpers/dataService";
import { authGuard } from "../helpers/authService";
import useRedirectOnLogout from "../helpers/useRedirectOnLogout";

import EmptyComponent from "../components/Empty";
import Spinner from "../components/Spinner";
import ShoppingList from "../components/shopping/ShoppingList";
import ShoppingListForm from "../components/shopping/ShoppintListForm";

const ShoppingListPage = () => {

    console.log('Shopping List Page');
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
    console.log(response);

    if ('error' in response) {
        console.log(response);
        throw new Error();
    }
    store.dispatch(shoppingListActions.initializeItems(response));
    return response;
}