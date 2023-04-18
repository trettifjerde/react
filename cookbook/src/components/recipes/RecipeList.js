import { Fragment, useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import { fetchRecipes } from "../../helpers/dataService";
import { recipesActions } from "../../store/recipesState";
import { generalActions } from "../../store/generalState";

import Spinner from '../../components/Spinner';
import RecipeItem from "./RecipeItem";


const RecipeList = (props) => {
    const recipes = useSelector(state => state.recipes.recipes);
    const dispatch = useDispatch();

    const [fetchBtnText, setFetchBtnText] = useState('Load more');
    const [isSpinnerVisible, setSpinnerVisible] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const loadBtn = useRef();

    const {filterString} = props;

    const filteredRecipes = recipes.filter(recipe => recipe.name.includes(filterString));

    console.log('RecipeListComp');

    const onLoadMoreRecipes = useCallback(async () => {

        setIsFetching(true);

        const newRecipes = await fetchRecipes(recipes[recipes.length - 1].id);
        
        if ("error" in newRecipes) 
            dispatch(generalActions.flashToast({text: newRecipes.error.message, isError: true}));
        else if (newRecipes.length > 0) {
            dispatch(recipesActions.setFetchedRecipes(newRecipes));
        }
        else 
            setFetchBtnText('No more recipes to load');

        setIsFetching(false);

    }, [recipes, dispatch, setFetchBtnText, setIsFetching]);

    useEffect(() => {
        if (fetchBtnText !== 'Load more') {
            loadBtn.current.disabled = true;
            const timer = setTimeout(() => {
                setFetchBtnText('Load more');
                loadBtn.current.disabled = false;
            }, 1000 * 60);
            return () => clearTimeout(timer);
        }
    }, [fetchBtnText])

    useEffect(() => {
        if (isFetching) {
            const timer = setTimeout(() => setSpinnerVisible(true), 200);
            return () => clearTimeout(timer);
        }
        else 
            setSpinnerVisible(false)
    }, [isFetching])

    return (
        <Fragment>
            <div className="recipes-c fadeIn">
                <TransitionGroup className="recipes-c">
                    {filteredRecipes.map(r => <CSSTransition key={r.id} classNames="recipe-item" timeout={400}>
                        <RecipeItem recipe={r} />
                    </CSSTransition>) }
                    {filteredRecipes.length === 0 && <CSSTransition key="recipes-btn" classNames="recipe-item" timeout={400}>
                        <div className="empty">No recipes found</div>
                    </CSSTransition>}
                </TransitionGroup>
                                    
                <button ref={loadBtn} type="button" className="btn btn-success" onClick={onLoadMoreRecipes}>{fetchBtnText}</button>  
            </div>

            { isSpinnerVisible && <Spinner /> }
        </Fragment>
    )
}
export default RecipeList;