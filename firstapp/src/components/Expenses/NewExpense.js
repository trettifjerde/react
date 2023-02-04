
import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

function NexExpense(props) {
    const [isFormVisible, setFormVisible] = useState(false);
    const saveNewExpenseHandler = (data) => {
        setFormVisible(false);
        props.onSaveExpenseData(data);
    }

    if (isFormVisible) {
        return (
            <div className="new-expense">
                <ExpenseForm onSaveExpenseData={saveNewExpenseHandler} onHideForm={() => setFormVisible(false)}  />
            </div>
        )
    }
    else {
        return (
            <div className="new-expense">
                <button type="button" onClick={() => setFormVisible(true)}>Add New Expense</button>
            </div>
        )
    }
}

export default NexExpense;