import { Suspense, useCallback, useEffect, useState } from 'react';
import { Outlet, NavLink, defer, useLoaderData, Await, useLocation } from "react-router-dom";

import { store } from "../../store/store";
import { generalActions } from "../../store/generalState";
import { recipesActions } from "../../store/recipesState";
import { fetchRecipes } from "../../helpers/dataService";

import RecipeList from '../../components/recipes/RecipeList';
import Spinner from '../../components/Spinner';


const RecipesPage = () => {
    const { recipesFetched } = useLoaderData();
    const location = useLocation();
    const [isMobileVisible, setMobileVisible] = useState(true);

    const [filterString, setFilterString] = useState('');
    const handleFilterChange = useCallback((e) => {
        setFilterString(e.target.value);

    }, []);
    const clearFilter = useCallback(() => setFilterString(''), []);

    const toggleMobileRecipes = useCallback(() => setMobileVisible(prev => (!prev)), [setMobileVisible]);

    useEffect(() => {
        if (! location.pathname.endsWith('recipes')) 
            setMobileVisible(false);
        else 
            setMobileVisible(true);
    }, [location, setMobileVisible]);

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={recipesFetched}>
                <div className={`fadeIn ${isMobileVisible ? 'open' : ''}`}>
                    <div className="row align-items-center search-bar">
                        <div className="col-auto">
                            <NavLink to="/recipes/new" className="btn btn-success">New Recipe</NavLink>
                        </div>
                        <div className="col input-cont">
                            <input type="text" className="form-control" value={filterString} onChange={handleFilterChange} placeholder="Type for a recipe..." />
                            <button type="button" className="btn btn-danger" onClick={clearFilter}>X</button>
                        </div>
                    </div>
                    <div className="show-recipes-btn mb-2">
                        <button type="button" className={`btn w-100 ${isMobileVisible ? 'btn-danger' : 'btn-success'}`} onClick={toggleMobileRecipes}>{ isMobileVisible ? 'Hide recipes' : 'Show recipes'}</button>
                    </div>
                    <main className="row mb-3">
                        <div className="col-md-5 side">
                            <RecipeList filterString={filterString} />
                        </div>
                        <div className="col-md-7 main">
                            <Outlet />
                        </div>
                    </main>
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
    const state = store.getState().recipes;

    if (state.isInitialized) {
        return true;
    }
    else {
        const recipes = await fetchRecipes();

        if ('error' in recipes) {
            store.dispatch(generalActions.flashToast({text: recipes.error.message, isError: true}));
            return true;
        }

        store.dispatch(recipesActions.setInitialRecipes(recipes));
        return true;
    }
}

