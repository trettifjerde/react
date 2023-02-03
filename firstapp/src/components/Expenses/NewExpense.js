
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

function NexExpense(props) {
    const expenseDataHandler = (data) => props.onSaveExpenseData(data);

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={expenseDataHandler} />
        </div>
    )
}

export default NexExpense;