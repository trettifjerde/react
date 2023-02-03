import { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm(props) {
    const [title, setTitle] = useState('Expense');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('0.1');

    const titleChangeHandler = (event) => setTitle(event.target.value);
    const dateChangeHandler = (event) => setDate(event.target.value);
    const amountChangeHandler = (event) => setAmount(event.target.value);
    
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const newExp = {
            title: title.trim(),
            amount: +amount,
            date: new Date(date)
        }
        setTitle('');
        setDate('');
        setAmount('');
        props.onSaveExpenseData(newExp);
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={title} onChange={titleChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" value={date} min="2021-01-01" max="2023-02-03" onChange={dateChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" value={amount} min="0.1" step="0.1" onChange={amountChangeHandler} />
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type="submit">Add expense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;