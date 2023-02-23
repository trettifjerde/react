import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { makeRecipe } from "../../helpers/utils";
import {loadRecipe} from "./RecipeDetails";

import RecipeForm from "../../components/recipes/RecipeForm";
import Spinner from "../../components/Spinner";


const RecipeFormPage = () => {
    const {recipe} = useLoaderData();
    console.log('recipe form page');

    return (       
        <Suspense fallback={<Spinner />}>  
            <Await resolve={recipe}>
                {loadedRecipe => <div className="fadeIn">
                    <RecipeForm recipe={loadedRecipe} />
                </div>}
            </Await>
        </Suspense> 
    )
};
export default RecipeFormPage;

export async function loader({request, params}) {
    return defer({
        recipe: params.id ? loadRecipe(params.id) : makeRecipe()
    })
}