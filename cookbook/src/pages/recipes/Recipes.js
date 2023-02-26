import { Suspense, useCallback, useState } from 'react';
import { Outlet, NavLink, defer, useLoaderData, Await } from "react-router-dom";

import { store } from "../../store/store";
import { generalActions } from "../../store/generalState";
import { recipesActions } from "../../store/recipesState";
import { fetchRecipes } from "../../helpers/dataService";

import RecipeList from '../../components/recipes/RecipeList';
import Spinner from '../../components/Spinner';


const RecipesPage = () => {
    console.log('Recipe Page');
    const { recipesFetched } = useLoaderData();

    const [filterString, setFilterString] = useState('');
    const handleFilterChange = useCallback((e) => {
        setFilterString(e.target.value);

    }, []);
    const clearFilter = useCallback(() => setFilterString(''), []);

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={recipesFetched}>
                <div className="fadeIn">
                    <div className="row align-items-center search-bar">
                        <div className="col-auto">
                            <NavLink to="/recipes/new" className="btn btn-success">New Recipe</NavLink>
                        </div>
                        <div className="col input-cont">
                            <input type="text" className="form-control" value={filterString} onChange={handleFilterChange} placeholder="Type for a recipe..." />
                            <button type="button" className="btn btn-danger" onClick={clearFilter}>X</button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-5 side">
                            <div className="side-content">
                                <RecipeList filterString={filterString} />
                            </div>
                        </div>
                        <div className="col-md-7 main">
                            <div className="main-content">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
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
    console.log('initializing recipes');
    const state = store.getState().recipes;

    if (state.isInitialized) {
        return true;
    }
    else {
        const recipes = await fetchRecipes();

        if ('error' in recipes) {
            console.log(recipes.error);
            store.dispatch(generalActions.flashToast({text: recipes.error.message, isError: true}));
            return true;
        }

        store.dispatch(recipesActions.setInitialRecipes(recipes));
        return true;
    }
}

