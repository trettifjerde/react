import { Outlet, NavLink, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from 'react';
import './Recipes.css';

import RecipeList from '../../components/recipes/RecipeList';
import { store } from "../../store/store";
import { recipesActions } from "../../store/recipesState";
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import { fetchRecipes } from "../../helpers/dataService";
import { useDispatch, useSelector } from "react-redux";

const RecipesPage = () => {
    const { recipesFetched } = useLoaderData();
    const error = useSelector(state => state.recipes.error);
    const isSubmitting = useSelector(state => state.recipes.isSubmitting);
    const dispatch = useDispatch();
    console.log('RecipesPage');

    const handleSubmitting = () => {
        dispatch(recipesActions.setSubmittingStatus(true));
    }

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={recipesFetched}>
                {error && <Alert message={error.message} /> }
                <div className="fadeIn">
                    <div className="row">
                        <div className="col-auto">
                            <button onClick={handleSubmitting} className="btn btn-success mb-2" to="new">New Recipe</button>
                        </div>
                        <div className="col input-cont">
                            <input type="text" className="form-control" placeholder="Type for a recipe..." />
                            <button type="button" className="btn btn-danger">X</button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-5 side">
                            <div className="side-content">
                                <RecipeList />
                            </div>
                        </div>
                        <div className="col-md-7 main">
                            <div className="main-content">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
                {isSubmitting && <Spinner />}
            </Await>
        </Suspense>
    )
};

export default RecipesPage;

export function loader() {
    return defer({
        recipesFetched: initializeRecipes()
    })
}

async function initializeRecipes() {
    const state = store.getState().recipes;

    if (state.isInitialized) {
        return true;
    }
    else {
        const recipes = await fetchRecipes();

        if ('error' in recipes) {
            console.log(recipes.error);
            store.dispatch(recipesActions.announceError(recipes.error));
            return true;
        }

        store.dispatch(recipesActions.setInitialRecipes(recipes));
        return true;
    }
}

