import { useContext, useRef } from 'react';
import CartContext from '../../store/CartContext';
import Input from '../UI/Input';
import './MealItemForm.css';

const MealItemForm = (props) => {
    const inputRef = useRef();
    const {addItem : ctxAddItem} = useContext(CartContext);

    const addItem = () => {
        const amount = inputRef.current.getValue();
        if (amount >= 1) {
            ctxAddItem(props.item, amount);
        }
    }

    return <form className="form">
        <Input 
            input={{
                type: 'number', id: 'amount', 
                min: '1', max:'10', 
                name: 'amount', step: '1', 
                defaultValue: 1
            }}
            label="Amount"
            ref={inputRef}
        />
        <button type="button" onClick={addItem} >+ Add</button>
    </form>
}

export default MealItemForm;