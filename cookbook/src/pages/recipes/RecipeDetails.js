import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, NavLink, json, defer, Await, useParams, useNavigate } from 'react-router-dom';

import  { store } from '../../store/store';
import { recipesActions } from '../../store/recipesState';
import { fetchRecipe, deleteRecipe } from '../../helpers/dataService';

import Spinner from '../../components/Spinner';
import Dropdown from '../../components/Dropdown';
import RecipeErrorPage from './RecipeError';

import './RecipeDetails.css';

const RecipeDetailsPage = () => {
    console.log('Recipe Details Page');
    const {recipe} = useLoaderData();
    const params = useParams();
    const navigate = useNavigate();
    const top = useRef();

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const ddBtnRef = useRef();

    const manageBtnDisabled = false;

    useEffect(() => {
        if (top.current) top.current.scrollIntoView();
    }, [params]);

    const toggleDropdown = useCallback(() => setDropdownVisible((prevState) => (!prevState)), []);
    const toShoppingList = () => {};
    const onDeleteRecipe = useCallback(async() => {
        const isConfirmed = window.confirm('Delete recipe?');
        if (isConfirmed) {
            const response = await deleteRecipe(params.id);

            if ('error' in response) {
                store.dispatch(recipesActions.announceError(response.error));
                throw json({message: response.error.message}, {status: response.error.status});
            }

            store.dispatch(recipesActions.deleteRecipe(params.id));
            navigate('/recipes');
        }
    }, [navigate, params]);

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={recipe} errorElement={<RecipeErrorPage />}>
                { loadedRecipe => 
                <div className="fadeIn" ref={top}>
                    <div className="detail-header">
                        <div className="detail-header-img">
                            <img src={loadedRecipe.imagePath} className="img-fluid" />
                        </div>
                        <div className="detail-header-text">
                            <div className="row flex-nowrap g-2 justify-content-between mb-3">
                                <h1 className="col-8">{ loadedRecipe.name }</h1>
                                <div className="col-auto">
                                    <div className="dropdown">
                                        <button ref={ddBtnRef} className="btn btn-outline-light dropdown-toggle" onClick={toggleDropdown} disabled={manageBtnDisabled}>
                                            Manage
                                        </button>
                                        <Dropdown btn={ddBtnRef} isVisible={isDropdownVisible} onBgClick={toggleDropdown}>
                                            <div className='dropdown-item' onClick={toShoppingList}>To Shopping List</div>
                                            <NavLink className='dropdown-item' to="edit">Edit Recipe</NavLink>
                                            <div className='dropdown-item' onClick={onDeleteRecipe}>Delete Recipe</div>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-desc">
                                <div>{loadedRecipe.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-block">
                        <h5>Ingredients</h5>
                        <ul className="list-group">
                            {loadedRecipe.ingredients.map((ing, i) => <li key={i} className="list-group-item">{`${ing.amount} ${ing.unit} ${ing.name}`}</li>)}
                        </ul>
                    </div>
                    <div className="detail-block">
                        <h5>Steps</h5>
                        <ol className="list-group list-group-flush list-group-numbered">
                            { loadedRecipe.steps.map((step, i) => <li key={i} className="list-group-item">{step}</li>)}
                        </ol>
                    </div>
                </div>
            }</Await>
        </Suspense>
    )
};

export default RecipeDetailsPage;

export function recipeLoader({request, params}) {
    return defer({
        recipe: loadRecipe(params.id)
    })
}

export async function loadRecipe(id) {
    console.log('loading recipe');

    const cache = store.getState().recipes.cache;

    if (id in cache) return cache[id];
    
    const recipe = await fetchRecipe(id);
    if ('error' in recipe) {
        throw recipe.error.message;
    }

    store.dispatch(recipesActions.saveRecipeInCache({recipe, id}));

    return recipe;
}