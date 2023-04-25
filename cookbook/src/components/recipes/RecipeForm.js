import { useCallback, useState, useRef, Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './RecipeForm.css';

const RecipeForm = (props) => {
    const {recipe, onSubmitForm, onCancelSubmit} = props;

    const [ings, setIngs] = useState(makeInitIngs(recipe.ingredients));
    const [steps, setSteps] = useState(makeInitSteps(recipe.steps));
    const [errors, setErrors] = useState({});

    const contTop = useRef();

    const addNewIngredient = useCallback(() => setIngs(prev => ([...prev, makeNewIng()])), [setIngs]);
    const addNewStep = useCallback(() => setSteps(prev => ([...prev, makeNewStep()])), [setSteps]);

    const removeIng = useCallback(id => setIngs(prev => prev.filter(ing => ing.id !== id)), [setIngs]);
    const removeStep = useCallback(id => setSteps(prev => prev.filter(step => step.id !== id)), [setSteps]);

    const moveStep = useCallback((id, adjust) => setSteps((prevSteps) => {
        const i = prevSteps.findIndex(step => step.id === id);
        let filteredSteps = [...prevSteps];
        const splicedSteps = filteredSteps.splice(i, 1);
        filteredSteps.splice(i + adjust, 0, splicedSteps[0]);
        return filteredSteps;
    }), [setSteps]);

    const submitForm = useCallback((e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const errs = formErrors(formData);

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            contTop.current.scrollIntoView({behavior: 'smooth'});
        }
        else {
            const data = transformToRequestData(formData);
            onSubmitForm(data);
        }
    }, [setErrors, onSubmitForm]);

    const cancelSubmit = useCallback(() => onCancelSubmit(), [onCancelSubmit]);

    return (    
        <Fragment>
            <div className="label-row" ref={contTop}>
                <h3>{ recipe.id ? 'Edit recipe' : 'Add recipe'}</h3> 
                {Object.keys(errors).length > 0 && <p className="form-text text-danger">Form contains errors</p>}
            </div>         
            <form className="recipe-form" onSubmit={submitForm}
            >     
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
                        { errors.ingredients  && <p className="form-text text-danger">
                            Ingredients are required
                        </p>}
                    </div>
                    <TransitionGroup>
                        { ings.map(ing => (
                            <CSSTransition key={ing.id} timeout={300} classNames='list-item'>
                                <div className="row row-cols-auto align-items-center g-2 flex-nowrap ingred-cont">
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
                            </CSSTransition>
                        )) }
                    </TransitionGroup>
                    <button type="button" className="btn btn-outline-success mt-2" onClick={addNewIngredient}>
                        Add new ingredient
                    </button>
                </div>
                <hr/>
                <div className="form-group">
                    <div className="label-row">
                        <label>Steps</label>
                        { errors.steps && <p className="form-text text-danger">
                            Steps cannot be empty or longer than 1000 characters each
                        </p>}
                    </div>
                    <TransitionGroup component="ol" className="list-group list-group-flush steps">
                        { steps.map(step => <CSSTransition key={step.id} timeout={300} classNames="list-item">
                            <li className="list-group-item row step">
                                <div className="col-auto step-num-n-del">
                                    <div className="btn order-btn"></div>
                                    <button className="btn btn-outline-danger" type="button" onClick={removeStep.bind(null, step.id)}>X</button>      
                                </div>
                                <div className="col-md-8 step-area">
                                    <textarea className={`form-control ${errors[step.id] ? 'invalid' : ''}`} name={step.id} defaultValue={step.step}></textarea>
                                </div>
                                <div className="col-auto step-move-btns">
                                    <button className="btn btn-outline-success" type="button" onClick={moveStep.bind(null, step.id, -1)}>🡅</button>
                                    <button className="btn btn-outline-success" type="button" onClick={moveStep.bind(null, step.id, 1)}>🡇</button>      
                                </div>
                            </li>
                        </CSSTransition>)}     
                    </TransitionGroup>
                    <button type="button" className="btn btn-outline-success" onClick={addNewStep}>
                        Add new step
                    </button>
                </div>
                <hr/>
                <div className="row justify-content-between g-0">
                    <button className="btn btn-success col-5" type="submit" disabled={false}>Submit</button>
                    <button className="btn btn-outline-success col-5" type="button" onClick={cancelSubmit}>Cancel</button>
                </div>
            </form>
        </Fragment>
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
    let ings = false;
    let steps = false;

    for (const [name, value] of formData.entries()) {
        if ((name === 'description' || name === 'name') && !value.trim()) {
            errors[name] = 'required';
        }
        else if (name.endsWith('-name')) {
            ings = true;
            if (!value.trim()) {
                errors[name] = 'required';
                errors['ingredients'] = 'empty';
            }
        }
        else if (name.startsWith('step')) {
            steps = true;
            if (!value.trim()) {
                errors[name] = 'required';
                errors['steps'] = 'empty';
            }
        }
        else if (name.endsWith('amount') && isNaN(+value)) {
            errors[name] = 'NaN';
        }
        else if (name === 'description' && value.length > 1000) {
            errors[name] = 'too long';
        }
    }

    if (!ings)
        errors['ingredients'] = 'required';
    if (!steps) 
        errors['steps'] = 'required';

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
            let val;
            switch(type) {
                case 'amount':
                    val = +value ? +value : null;
                    break;
                case 'unit':
                    val = value ? value : null;
                    break;
                case 'name':
                    val = value.trim();
                    break;
            }
            ingredients[id][type] = val;
        }
        else if (key.startsWith('step')) {
            steps.push(value.trim());
        }
    };
    ingredients = Object.values(ingredients);
    ingredients.forEach(ing => {
        if (ing.unit && !ing.amount) ing.amount = 1;
    })

    const data = {
        name: f.get('name'),
        description: f.get('description'),
        imagePath: f.get('imagePath') || '',
        ingredients,
        steps
    };
    return data;
}