import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { shoppingListActions } from "../../store/shoppingListState";
import { generalActions } from "../../store/generalState";
import { prepareIngredientSubmit } from "../../helpers/utils";

const ShoppingListForm = () => {

    const {selectedItem : item, items} = useSelector(state => state.shoppingList);
    const {id} = item;
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const formEl = useRef();

    const saveIngredient = useCallback(async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const errors = ingredErrors(formData);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        dispatch(generalActions.setSubmitting(true));

        const [submitFn, message] = prepareIngredientSubmit(formData, id, items);

        if (!submitFn) {
            dispatch(generalActions.flashToast({text: message, isError: true}));
            return;
        }

        const res = await submitFn();
        if ('error' in res) 
            dispatch(generalActions.flashToast({text: res.error.message, isError: true}));
        else {
            dispatch(shoppingListActions.updateItem(res));
            dispatch(generalActions.flashToast({text: message, isError: false}))
        }

    }, [setErrors, dispatch, id, items]);

    const clearForm = useCallback(() => dispatch(shoppingListActions.clearItem()), [dispatch]);

    useEffect(() => {
        if (formEl.current) {
            formEl.current['name'].value = item.name;
            formEl.current['amount'].value = item.amount;
            formEl.current['unit'].value = item.unit;
            formEl.current['name'].focus();
            setErrors({});
        }
    }, [item, formEl, setErrors]);

    return (
        <div className="row">
            <div className="col">
                <form onSubmit={saveIngredient} ref={formEl}>
                    <div className="row mb-2 g-2">
                        <div className="col-8 form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" className={`form-control ${errors.name ? 'invalid' : ''}`} />
                        </div>
                        <div className="col-2 form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" id="amount" name="amount" className={`form-control ${errors.amount ? 'invalid' : ''}`} />
                        </div>
                        <div className="col-2 form-group">
                            <label htmlFor="unit">Units</label>
                            <input type="text" id="unit" name="unit" className={`form-control ${errors.unit ? 'invalid' : ''}`} />
                        </div>
                    </div>
                    <div className="row align-items-center row-cols-auto mg-2 g-2">
                        <div className="col">
                            <button type="submit" className="btn-success btn">{item.id ? 'Edit' : 'Add'}</button>
                        </div>
                        <div className="col ">
                            <button type="button" className="btn btn-outline-secondary" onClick={clearForm}>Clear</button>
                        </div>
                        {Object.keys(errors).length > 0 && <div className="col text-danger form-text text-end flex-grow-1">{Object.values(errors).join('. ')}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ShoppingListForm;

function ingredErrors(formData) {
    const errors = {};
    for (const [key, value] of formData.entries()) {
        if (key === 'name') {
            if (!value.trim()) {
                errors[key] = 'Name is required';
            }
        }
        else if (key === 'amount') {
            if (value.trim() && (isNaN(value) || +value < 0.01)) {
                errors[key] = 'Invalid amount';
            }
        }
        else if (key === 'unit') {
            if (value.trim() && (!formData.get('amount') || isNaN(formData.get('amount')) || +formData.get('amount') < 0.01)) {
                errors[key] = 'Cannot enter units without specifying amount'
            }
        }
    }
    return errors;
}