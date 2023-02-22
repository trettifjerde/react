import { Fragment, useCallback, useState } from "react"
import { json, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import Alert from "../../components/Alert";
import Spinner from '../../components/Spinner';

const RecipesPage = () => {
    const state = useSelector(state => state.recipes);
    const [filterString, setFilterString] = useState('');

    const onChangeFilterString = useCallback((v) => setFilterString(v), []);
    const onClearFilterString = useCallback(() => setFilterString(''), []);

    return (
        <Fragment>
            { state.error && <Alert message={error.message} /> }
            { state.fetched && <div className="fadeIn">
                <div className="row">
                    <div className="col-auto">
                        <button className="btn btn-success mb-2" routerLink="new">New Recipe</button>
                    </div>
                    <div className="col input-cont">
                        <input type="text" className="form-control" value={filterString} onChange={onChangeFilterString} placeholder="Type for a recipe..." />
                        <button type="button" className="btn btn-danger" onClick={onClearFilterString}>X</button>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-5 side">
                        <div className="side-content">
                            <RecipeList filterString={filterString}/>
                        </div>
                    </div>
                    <div className="col-md-7 main">
                        <div className="main-content">
                            <Outlet />
                        </div>
                        <div className="main-content">
                            <div className="empty">
                                <Spinner />
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            { state.spinnerVisible && <Spinner /> }
        </Fragment>
    )
};

export default RecipesPage;

export async function loader({request}) {
    const response = await fetch('https://academind34-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {
        params: {
            orderBy: '"$key"',
            startAt: 0,
            limitToFirst: 3
        }
    });
    if (!response.ok) {
        console.log(response);
        throw json({message: 'Error fetching recipes'}, {status: 500});
    }

    const data = await response.json();
    const processedData = data ? Object.entries(data).reduce(
        (acc, [id, recipe]) => {
            acc.push({
                name: recipe.name,
                id: recipe.id,
                description: recipe.description,
                imagePath: recipe.imagePath,
                steps: recipe.steps,
                ingredients: ingredients.map(ingRaw => new IngredientRaw(ingRaw));)
            };
            return acc;
        }, []) : [];
    
}

