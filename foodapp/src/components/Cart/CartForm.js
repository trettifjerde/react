import FormInput from "../UI/FormInput";
import classes from './CartForm.module.css';
import useInput from "../../hooks/useInput";
import useFetch from "../../hooks/useFetch";
import CartItemMin from "./CartItemMin";
import { useState } from "react";

const textConfig = {
    type: 'text',
    validators: [(value) => !!value.trim()],
    errorMessages: ['Must not be empty']
};

const nameConfig = {...textConfig, label: 'Your name', id: 'customerName'};
const addressConfig = {
    ...textConfig, 
    label: 'Street', 
    id: 'address', 
    validators: [...textConfig.validators, (value) => /\d/g.test(value)],
    errorMessages: ['Must contain valid steet name and house number']
};
const emailConfig = {
    type: 'email',
    validators: [(value) => /^\w+([.\-!#$%&'*+\-/=?^_`{|}~]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value)],
    errorMessages: ['Must be a valid email address'],
    label: 'Email address',
    id: 'email'
}

const CartForm = (props) => {
    const [nameValue, isNameValid, showNameError, handleNameBlur, handleNameChange, resetNameValue] = useInput(nameConfig.validators);
    const [addressValue, isAddressValid, showAddressError, handleAddressBlur, handleAddressChange, resetAddressValue] = useInput(addressConfig.validators);
    const [emailValue, isEmailValid, showEmailError, handleEmailBlur, handleEmailChange, resetEmailValue] = useInput(emailConfig.validators);
    const [sendFetch] = useFetch();
    const {items, onOrderSubmit, onOrderCancel} = props;
    const [error, setError] = useState('');
    const [isSendingRequest, setSendingRequest] = useState(false);

    const isFormValid = isNameValid && isAddressValid && isEmailValid;

    console.log('CartForm');


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid && items.length > 0) {
            const order = {
                name: nameValue, 
                address: addressValue, 
                meals: items.map(item => ({id: item.id, amount: item.amount}))
            };

            setSendingRequest(true);

            const [isOk, res] = await sendFetch({
                url: 'https://academind34-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
                method: 'POST',
                body: order
            });

            if (isOk) {
                resetNameValue();
                resetAddressValue();
                resetEmailValue();
                onOrderSubmit(res.name);
            }
            else {
                setError('Failed to submit the order. Check your internet connection and try again later.');
            }

            setSendingRequest(false);
        }
    }

    return (
        <div>
            <ul className={classes['min-items-list']}>
                {items.map(item => <CartItemMin key={item.id} item={item} />)}
            </ul>

            <div className={classes['total']}>
                <span>Total</span>
                <span>{`$${props.totalAmount}`}</span>
            </div>

            {!isSendingRequest && <div className={classes['form-container']}>
                <h2>Delivery information</h2>
                {error && <p className={classes['error-message']}>{error}</p>}
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <FormInput config={nameConfig} showError={showNameError} onChange={handleNameChange} onBlur={handleNameBlur} value={nameValue}/>
                        <FormInput config={emailConfig} showError={showEmailError} onChange={handleEmailChange} onBlur={handleEmailBlur} value={emailValue} />
                        <FormInput config={addressConfig} showError={showAddressError} onChange={handleAddressChange} onBlur={handleAddressBlur} value={addressValue}/>
                    </div>
                    <div className="c">
                        <button disabled={!isFormValid}>Submit order</button>
                        <button type="button" className="alt" onClick={onOrderCancel}>Cancel</button>
                    </div>
                </form>
            </div>}

            {isSendingRequest && <p className="c">Submitting order...</p>}
        </div>
    )


}

export default CartForm;