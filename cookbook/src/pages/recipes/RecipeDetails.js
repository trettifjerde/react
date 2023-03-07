import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData, NavLink, json, defer, Await, useNavigate } from 'react-router-dom';

import  { store } from '../../store/store';
import { generalActions } from "../../store/generalState";
import { recipesActions } from '../../store/recipesState';
import { fetchRecipe, deleteRecipe } from '../../helpers/dataService';

import Spinner from '../../components/Spinner';
import Dropdown from '../../components/Dropdown';
import RecipeErrorPage from './RecipeError';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeToShoppingList } from '../../store/shoppingListState';
import ConfirmationModal from '../../components/ConfirmationModal';


const RecipeDetailsPage = () => {
    const {recipe} = useLoaderData();
    const user = useSelector(state => state.general.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const top = useRef();
    const ddBtnRef = useRef();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);

    const toggleDropdown = useCallback(() => setDropdownVisible((prevState) => (!prevState)), [setDropdownVisible]);
    const toShoppingList = useCallback(ingreds => dispatch(addRecipeToShoppingList(ingreds)), [dispatch]);
    const closeDeleteRecipeConfirm = useCallback(() => setModalInfo(null), [setModalInfo]);

    const onDeleteRecipe = useCallback(async id => {
        dispatch(generalActions.setSubmitting(true));
        
        const response = await deleteRecipe(id);

        if ('error' in response) {
            dispatch(generalActions.flashToast({text: response.error.message, isError: true}));
            throw json({message: response.error.message}, {status: response.error.status});
        }

        store.dispatch(recipesActions.deleteRecipe(id));
        store.dispatch(generalActions.flashToast({text: 'Recipe deleted', isError: false}));
        navigate('/recipes');
    }, [navigate, dispatch]);

    const askDeleteRecipeConfirm = useCallback(recipe => setModalInfo({
        question: 'Delete recipe',
        bold: recipe.name,
        onConfirm: onDeleteRecipe.bind(null, recipe.id)
    }), [setModalInfo, onDeleteRecipe]);

    useEffect(() => {
        if (top.current) top.current.scrollIntoView();
    }, [recipe]);

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={recipe} errorElement={<RecipeErrorPage />}>
                { 
                    loadedRecipe => 
                        <div className="fadeIn" ref={top}>
                            <div className="detail-header">
                                <div className="detail-header-img">
                                    <img src={loadedRecipe.imagePath} className="img-fluid" />
                                </div>
                                <div className="detail-header-text">
                                    <div className="row flex-nowrap g-2 justify-content-between mb-3">
                                        <h1 className="col-8">{ loadedRecipe.name }</h1>
                                        <div className="col-auto">
                                            {user && <div className="dropdown">
                                                <button ref={ddBtnRef} className="btn btn-outline-light dropdown-toggle" onClick={toggleDropdown}>
                                                    Manage
                                                </button>
                                                <Dropdown btn={ddBtnRef} isVisible={isDropdownVisible} onBgClick={toggleDropdown}>
                                                    <div className='dropdown-item' onClick={toShoppingList.bind(null, loadedRecipe.ingredients)}>To Shopping List</div>
                                                    <NavLink className='dropdown-item' to="edit">Edit Recipe</NavLink>
                                                    <div className='dropdown-item' onClick={askDeleteRecipeConfirm.bind(null, loadedRecipe)}>Delete Recipe</div>
                                                </Dropdown>
                                            </div>}
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

                            { modalInfo && <ConfirmationModal onClose={closeDeleteRecipeConfirm} confirmInfo={modalInfo} />}
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
    const cache = store.getState().recipes.cache;

    if (id in cache) return cache[id];
    
    const recipe = await fetchRecipe(id);
    if ('error' in recipe) {
        throw recipe.error.message;
    }

    store.dispatch(recipesActions.saveRecipeInCache(recipe));

    return recipe;
}