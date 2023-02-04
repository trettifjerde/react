import { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    & .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
        text-align: left;
    }
    
    & .control label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }
    
    & .control input {
        font: inherit;
        padding: 0.5rem;
        border-radius: 6px;
        width: 20rem;
        max-width: 100%;
    }

    & .control input[type=text] {
        border: 1px solid ${props => props.isTitleValid ? 'transparent' : 'red'};
    }

    & .control input[type=date] {
        border: 1px solid ${props => props.isDateValid ? 'transparent' : 'red'};
    }

    & .control input[type=number] {
        border: 1px solid ${props => props.isAmountValid ? 'transparent' : 'red'};
    }
    
    & .actions {
        text-align: right;
    }
`;

function ExpenseForm(props) {
    function getNowForInput() {
        return `${new Date().toISOString().slice(0, 10)}`;
    }
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(getNowForInput());
    const [amount, setAmount] = useState('');
    const [isTitleValid, setTitleValid] = useState(true);
    const [isDateValid, setDateValid] = useState(true);
    const [isAmountValid, setAmountValid] = useState(true);

    const titleChangeHandler = (event) => {
        setTitleValid(true);
        setTitle(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setDateValid(true);
        setDate(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setAmountValid(true);
        setAmount(event.target.value);
    }
    
    const formSubmitHandler = (event) => {
        event.preventDefault();
        let valid = true;
        
        if (!title.trim()) {
            setTitleValid(false);
            valid = false;
        }
        if ((+amount) <= 0) {
            setAmountValid(false);
            valid = false;
        }
        if (isNaN(Date.parse(date))) {
            setDateValid(false);
            valid = false;
        }

        if (valid) {
            const newExp = {
                title: title.trim(),
                amount: +amount,
                date: new Date(date)
            };

            setTitle('');
            setDate(getNowForInput());
            setAmount('');
            props.onSaveExpenseData(newExp);
        }
        
    };

    return (
        <StyledForm isTitleValid={isTitleValid} isAmountValid={isAmountValid} isDateValid={isDateValid} onSubmit={formSubmitHandler}>
            <div className="controls">
                <div className="control">
                    <label>Title</label>
                    <input type="text" value={title} onChange={titleChangeHandler} />
                </div>
                <div className="control">
                    <label>Date</label>
                    <input type="date" value={date} min="2021-01-01" max={getNowForInput()} onChange={dateChangeHandler}/>
                </div>
                <div className="control">
                    <label>Amount</label>
                    <input type="number" value={amount} min="0.1" step="0.1" onChange={amountChangeHandler} />
                </div>
            </div>
            <div className='actions'>
                <button type="button" onClick={props.onHideForm}>Cancel</button>
                <button type="submit">Add expense</button>
            </div>
        </StyledForm>
    );
}

export default ExpenseForm;