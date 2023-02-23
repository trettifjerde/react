import { useCallback, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { redirect, useNavigate, json } from "react-router-dom";
import { sendRecipe } from "../../helpers/dataService";

import { recipesActions } from "../../store/recipesState";

import './RecipeForm.css';

const RecipeForm = (props) => {

    const {recipe} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ings, setIngs] = useState(makeInitIngs(recipe.ingredients));
    const [steps, setSteps] = useState(makeInitSteps(recipe.steps));
    const [errors, setErrors] = useState({});

    const contTop = useRef();

    const addNewIngredient = useCallback(() => setIngs(prev => ([...prev, makeNewIng()])), [setIngs]);
    const addNewStep = useCallback(() => setSteps(prev => ([...prev, makeNewStep()])), [setSteps]);

    const removeIng = useCallback(id => setIngs(prev => prev.filter(ing => ing.id !== id)), [setIngs]);
    const removeStep = useCallback(id => setSteps(prev => prev.filter(step => step.id !== id)), [setSteps]);

    const submitForm = useCallback(async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const errs = formErrors(formData);

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            contTop.current.scrollIntoView({behavior: 'smooth'});
        }
        else {
            const data = transformToRequestData(formData);

            const response = await sendRecipe(data, recipe.id);
            
            if ('error' in response) {
                dispatch(recipesActions.announceError(response.error));
                throw json({message: response.error.message}, {status: response.error.status});
            }

            if (recipe.id) {
                dispatch(recipesActions.updateRecipe({...data, id: recipe.id}));
                return redirect('/recipes/' + recipe.id);
            }
            else {
                dispatch(recipesActions.addRecipe({...data, id: response.name}));
                return redirect('/recipes/' + response.name);
            }

        }
    }, [setErrors, recipe, dispatch]);

    const cancelSubmit = useCallback(() => navigate('../'), [navigate]);

    return (            
        <form className="recipe-form" onSubmit={submitForm}
        >
            <div className="label-row">
                <h3 ref={contTop}>{ recipe.id ? 'Edit recipe' : 'Add recipe'}</h3>
                {Object.keys(errors).length > 0 && <p className="form-text text-danger">Form contains errors</p>}
            </div>      
            
            <div className="form-group">
                <div className="label-row">
                    <label htmlFor="name">Name</label>
                    { errors.name && <p className="form-text text-danger">Name is required</p>}
                </div>
                <input type="text" id="name" name="name" className={`form-control ${errors.name ? 'invalid' : ''}`} defaultValue={recipe.name} />
            </div>
            <hr/>
            <div className="form-group">
                <div className="label-row">
                    <label htmlFor="description">Description</label>
                    { errors.description && <p className="form-text text-danger">Description is required</p>}
                </div>
                <textarea className={`form-control larger ${errors.description ? 'invalid' : ''}`} name="description" defaultValue={recipe.description}></textarea>
                
            </div>
            <hr/>
            <div className="form-group">
                <label htmlFor="imagePath">Image URL</label>
                <input type="text" className="form-control" name="imagePath" defaultValue={recipe.imagePath}/>
            </div>
            <hr/>
            <div className="form-group">
                <div className="label-row">
                    <label>Ingredients</label>
                    { errors.ingredients && <p className="form-text text-danger">
                        Ingredient names are required
                    </p>}
                </div>
                { ings.map(ing => (
                    <div key={ing.id} className="row row-cols-auto align-items-center g-2 flex-nowrap ingred-cont">
                        <div className="col flex-shrink-1">
                            <input type="number" className={`form-control ${errors[ing.id + '-amount'] ? 'invalid' : ''}`} defaultValue={ing.amount} name={`${ing.id}-amount`} placeholder="amount" />
                        </div>
                        <div className="col flex-shrink-1">
                            <input type="text" className="form-control" defaultValue={ing.unit} name={`${ing.id}-unit`} placeholder="unit" />
                        </div>
                        <div className="col flex-grow-1">
                            <input type="text" className={`form-control ${errors[ing.id + '-name'] ? 'invalid' : ''}`} defaultValue={ing.name} name={`${ing.id}-name`} placeholder="name" />
                        </div>
                        <div className="col flex-shrink-1">
                            <button className="btn btn-outline-danger" type="button" onClick={removeIng.bind(null, ing.id)}>X</button>
                        </div>            
                    </div>
                )) }
                <button type="button" className="btn btn-outline-success mt-2" onClick={addNewIngredient}>
                    Add new ingredient
                </button>
            </div>
            <hr/>
            <div className="form-group">
                <div className="label-row">
                    <label>Steps</label>
                    { errors.steps && <p className="form-text text-danger">
                        Make sure instructions are neither empty nor longer than 1000 letters
                    </p>}
                </div>
                <ol className="list-group list-group-flush list-group-numbered">
                    { steps.map(step => <li key={step.id} className="list-group-item d-flex row align-items-center justify-content-between p-1 m-1">
                        <div className="col-md-8 flex-grow-1">
                            <textarea className={`form-control ${errors[step.id] ? 'invalid' : ''}`} name={step.id} defaultValue={step.step}></textarea>
                        </div>
                        <div className="col-auto g-0">
                            <button className="btn btn-outline-danger" type="button" onClick={removeStep.bind(null, step.id)}>X</button>      
                        </div>
                    </li>)}     
                </ol>
                <button type="button" className="btn btn-outline-success" onClick={addNewStep}>
                    Add new step
                </button>
            </div>
            <hr/>
            <div className="row justify-content-evenly g-0">
                <button className="btn btn-success col-5" type="submit" disabled={false}>Submit</button>
                <button className="btn btn-outline-success col-5" type="button" onClick={cancelSubmit}>Cancel</button>
            </div>
        </form>
    )
};
export default RecipeForm;

function makeNewIng(ing={}, i) {
    return {...ing, id: `ing${new Date().getTime()}${i ? i : ''}`};
};
function makeNewStep(step='', i) {
    return {step, id: `step${new Date().getTime()}${i ? i : ''}`};
};

function makeInitIngs(ings) { return ings.length > 0 ? ings.map((ing, i) => makeNewIng(ing, i)) : [makeNewIng()] };

function makeInitSteps(steps) { return steps.length > 0 ? steps.map((step, i) => makeNewStep(step, i)) : [makeNewStep()] };

export function formErrors(formData) {
    const errors = {};
    for (const [name, value] of formData.entries()) {
        if ((name === 'description' || name === 'name') && !value.trim()) {
            errors[name] = 'required';
        }
        else if (name.endsWith('name') && !value.trim()) {
            errors[name] = 'required';
            errors['ingredients'] = 'empty';
        }
        else if (name.startsWith('step') && !value.trim()) {
            errors[name] = 'required';
            errors['steps'] = 'empty';
        }
        else if (name.endsWith('amount') && isNaN(+value)) {
            errors[name] = 'NaN';
        }
        else if (name === 'description' && value.length > 1000) {
            errors[name] = 'too long';
        }
    }
    return errors;
}

function transformToRequestData(f) {
    let ingredients = [];
    const steps = [];

    for (const [key, value] of f.entries()) {
        if (key.startsWith('ing')) {
            const dash = key.indexOf('-');
            const id = key.slice(0, dash);
            const type = key.slice(dash + 1);

            if (!(id in ingredients)) {
                ingredients[id] = {};
            }

            ingredients[id][type] = type === 'amount' ? +value : value.trim();
        }
        else if (key.startsWith('step')) {
            steps.push(value.trim());
        }
    };
    ingredients = Object.values(ingredients);

    const data = {
        name: f.get('name'),
        description: f.get('description'),
        imagePath: f.get('imagePath') || '',
        ingredients,
        steps
    };

    console.log(data);
    return data;
}