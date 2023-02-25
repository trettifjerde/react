import { Suspense, useCallback, useEffect } from "react";
import { Await, defer, useLoaderData, json, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeRecipe } from "../../helpers/utils";
import { loadRecipe } from "./RecipeDetails";
import { sendRecipe } from "../../helpers/dataService";
import { recipesActions } from "../../store/recipesState";
import { generalActions } from "../../store/generalState";
import { authGuard } from "../../helpers/authService";

import RecipeForm from "../../components/recipes/RecipeForm";
import Spinner from "../../components/Spinner";
import RecipeErrorPage from "./RecipeError";


const RecipeFormPage = () => {
    console.log('recipe form page');

    const user = useSelector(state => state.general.user);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const {recipe} = useLoaderData();

    const onSubmitForm = useCallback(async data => {
        const response = await sendRecipe(data, params.id);
            
        if ('error' in response) {
            dispatch(generalActions.announceError(response.error));
            throw json({message: response.error.message}, {status: response.error.status});
        }

        if (params.id) {
            dispatch(recipesActions.updateRecipe({...data, id: params.id}));
            dispatch(generalActions.announceError(null));
            navigate('/recipes/' + params.id);
        }
        else {
            dispatch(recipesActions.addRecipe({...data, id: response.name}));
            dispatch(generalActions.announceError(null));
            navigate('/recipes/' + response.name);
        }
    }, [dispatch, params, navigate]);

    const onCancelSubmit = useCallback(() => navigate('../'), [navigate]);

    useEffect(() => {
        if (!user) navigate('/recipes');
    }, [user, navigate]);

    return (       
        <Suspense fallback={<Spinner />}>  
            <Await resolve={recipe} errorElement={<RecipeErrorPage />}>
                {loadedRecipe => <div className="fadeIn">
                    <h3>{ params.id ? 'Edit recipe' : 'Add recipe'}</h3>
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