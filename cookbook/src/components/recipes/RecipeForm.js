import { useCallback, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import './RecipeForm.css';

const makeNewIng = (ing={}, i) => {
    return {...ing, id: `i${new Date().getTime()}${i ? i : ''}`};
};
const makeNewStep = (step='', i) => {
    return {step, id: `s${new Date().getTime()}${i ? i : ''}`};
};

const makeInitIngs = (ings) => ings.length > 0 ? ings.map((ing, i) => makeNewIng(ing, i)) : [makeNewIng()];

const makeInitSteps = (steps) => steps.length > 0 ? steps.map((step, i) => makeNewStep(step, i)) : [makeNewStep()];  

const RecipeForm = (props) => {

    const {recipe} = props;
    const actionData = useActionData();
    const navigate = useNavigate();

    const [ings, setIngs] = useState(makeInitIngs(recipe.ingredients));
    const [steps, setSteps] = useState(makeInitSteps(recipe.steps));

    const addNewIngredient = useCallback(() => setIngs(prev => ([...prev, makeNewIng()])), [setIngs]);
    const addNewStep = useCallback(() => setSteps(prev => ([...prev, makeNewStep()])), [setSteps]);

    const removeIng = useCallback(id => setIngs(prev => prev.filter(ing => ing.id !== id)), [setIngs]);
    const removeStep = useCallback(id => setSteps(prev => prev.filter(step => step.id !== id)), [setSteps]);

    const cancelSubmit = useCallback(() => navigate('../'), [navigate]);

    return (            
        <Form className="recipe-form" action={`/recipes/${recipe ? recipe.id + '/edit' : 'new'}`} method={`${recipe ? 'patch': 'post'}`}>
            <div className="form-group">
                <div className="label-row">
                    <label htmlFor="name">Name</label>
                    { actionData && <div>
                        <p className="form-text text-danger">Name is required</p>
                        <p className="form-text text-danger">Recipe with such name already exists</p>
                    </div>}
                </div>
                <input type="text" id="name" className="form-control" defaultValue={recipe.name} />
            </div>
            <hr/>
            <div className="form-group">
                <div className="label-row">
                    <label htmlFor="description">Description</label>
                    { actionData && <p className="form-text text-danger">Description is required</p>}
                </div>
                <textarea className="form-control larger" name="description" defaultValue={recipe.description}></textarea>
                
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
                    { actionData && <p className="form-text text-danger">
                        Ingredient names are required
                    </p>}
                </div>
                { ings.map(ing => (
                    <div key={ing.id} className="row row-cols-auto align-items-center g-2 flex-nowrap ingred-cont">
                        <div className="col flex-shrink-1">
                            <input type="number" className="form-control" defaultValue={ing.amount} name={`${ing.id}-amount`} placeholder="amount" />
                        </div>
                        <div className="col flex-shrink-1">
                            <input type="text" className="form-control" defaultValue={ing.unit} name={`${ing.id}-unit`} placeholder="unit" />
                        </div>
                        <div className="col flex-grow-1">
                            <input type="text" className="form-control" defaultValue={ing.name} name={`${ing.id}-name`} placeholder="name" />
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
                    { actionData && <p className="form-text text-danger">
                        Make sure instructions are neither empty nor longer than 1000 letters
                    </p>}
                </div>
                <ol className="list-group list-group-flush list-group-numbered">
                    { steps.map(step => <li key={step.id} className="list-group-item d-flex row align-items-center justify-content-between p-1 m-1">
                        <div className="col-md-8 flex-grow-1">
                            <textarea className="form-control" name={step.id} defaultValue={step.step}></textarea>
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
        </Form>
    )
};
export default RecipeForm;