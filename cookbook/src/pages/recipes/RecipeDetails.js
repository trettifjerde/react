import './RecipeDetails.css';
import { useLoaderData, NavLink, json, defer, Await } from 'react-router-dom';
import  { store } from '../../store/store';
import { recipesActions } from '../../store/recipesState';
import { fetchRecipe } from '../../helpers/dataService';
import Spinner from '../../components/Spinner';
import { Suspense, useCallback, useRef, useState } from 'react';
import Dropdown from '../../components/Dropdown';

const RecipeDetailsPage = () => {
    const {recipe} = useLoaderData();
    const manageBtnDisabled = false;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const ddBtnRef = useRef();

    const toggleDropdown = useCallback(() => setDropdownVisible((prevState) => (!prevState)), []);
    const toShoppingList = () => {};
    const deleteRecipe = () => {};

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={recipe}>
                { loadedRecipe => 
                <div className="fadeIn">
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
                                            <div className='dropdown-item' onClick={deleteRecipe}>Delete Recipe</div>
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

export async function loadRecipe(recipeId) {
    const recipe = await fetchRecipe(recipeId);

    if ('error' in recipe) {
        console.log(recipe.error);
        store.dispatch(recipesActions.announceError(recipe.error));
        return json({message: recipe.error.message}, {status: recipe.error.status});
    }

    return recipe;
}