import { Suspense, useCallback } from "react";
import { Await, defer, useLoaderData, json, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeRecipe } from "../../helpers/utils";
import { loadRecipe } from "./RecipeDetails";
import { sendRecipe } from "../../helpers/dataService";
import { recipesActions } from "../../store/recipesState";
import { generalActions } from "../../store/generalState";
import { authGuard } from "../../helpers/authService";

import RecipeForm from "../../components/recipes/RecipeForm";
import Spinner from "../../components/Spinner";
import RecipeErrorPage from "./RecipeError";
import useRedirectOnLogout from "../../helpers/useRedirectOnLogout";


const RecipeFormPage = () => {
    console.log('recipe form page');

    const params = useParams();
    const {recipe} = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useRedirectOnLogout();

    const onSubmitForm = useCallback(async data => {
        
        dispatch(generalActions.setSubmitting(true));

        const response = await sendRecipe(data, params.id);
            
        if ('error' in response) {
            dispatch(generalActions.flashToast({text: response.error.message, isError: true}));
            throw json({message: response.error.message}, {status: response.error.status});
        }

        if (params.id) {
            dispatch(recipesActions.updateRecipe({...data, id: params.id}));
            dispatch(generalActions.flashToast({text: 'Recipe updated', isError: false}));
            navigate('/recipes/' + params.id);
        }
        else {
            dispatch(recipesActions.addRecipe({...data, id: response.name}));
            dispatch(generalActions.flashToast({text: 'Recipe added', isError: false}));
            navigate('/recipes/' + response.name);
        }
    }, [dispatch, params, navigate]);

    const onCancelSubmit = useCallback(() => navigate('../'), [navigate]);

    return (       
        <Suspense fallback={<Spinner />}>  
            <Await resolve={recipe} errorElement={<RecipeErrorPage />}>
                {loadedRecipe => <div className="fadeIn">
                    <RecipeForm recipe={loadedRecipe} onSubmitForm={onSubmitForm} onCancelSubmit={onCancelSubmit} />
                </div>}
            </Await>
        </Suspense> 
    )
};
export default RecipeFormPage;

export async function loader({request, params}) {

    return authGuard() || defer({
        recipe: params.id ? loadRecipe(params.id) : makeRecipe()
    })
}