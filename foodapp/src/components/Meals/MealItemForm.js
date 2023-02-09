import { useRef, useState } from 'react';
import Input from '../UI/Input';
import './MealItemForm.css';

const MealItemForm = (props) => {
    const inputRef = useRef();
    const [isFormValid, setFormValid] = useState(true);

    const addItem = (event) => {
        event.preventDefault();
        const amount = +inputRef.current.value;

        if (amount < 1 || amount > 10) {
            setFormValid(false);
            return;
        }
        setFormValid(true);
        inputRef.current.value = 1;
        props.addItem(amount);
    }

    return <form className="form" onSubmit={addItem}>
        <Input 
            input={{
                type: 'number', id: 'amount', 
                min: '1', max:'10', 
                name: 'amount', step: '1', 
                defaultValue: 1
            }}
            className={`${isFormValid ? '' : 'invalid'}`}
            label="Amount"
            ref={inputRef}
        />
        <button>+ Add</button>
        {! isFormValid && <p>Invalid amount</p> }
    </form>
}

export default MealItemForm;