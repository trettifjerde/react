import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { shoppingListActions } from "../../store/shoppingListState";
import { checkIngredErrors } from "../../helpers/utils";
import { Form, useSubmit } from "react-router-dom";

const ShoppingListForm = () => {

    const {selectedItem : item} = useSelector(state => state.shoppingList);
    const dispatch = useDispatch();
    const submit = useSubmit();
    const [errors, setErrors] = useState({});
    const formEl = useRef();

    const validateIngredient = useCallback(async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const errors = checkIngredErrors(formData);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        submit(event.target);

    }, [setErrors, submit]);

    const clearForm = useCallback(() => dispatch(shoppingListActions.clearItem()), [dispatch]);

    useEffect(() => {
        if (formEl.current) {
            formEl.current['id'].value = item.id ? item.id : '';
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
                <Form method="post" onSubmit={validateIngredient} ref={formEl}>
                    <input type="hidden" name="id" />
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
                </Form>
            </div>
        </div>
    )
}
export default ShoppingListForm;