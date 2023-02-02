import './ExpenseDate.css';

function ExpenseDate(props) {
    const date = {
        year: props.date.getFullYear(),
        day: props.date.getDay(),
        month: props.date.toLocaleString('en', {month: 'long'})
    }

    return (
        <div className="expense-date">
            <div className="expense-date__month">{date.month}</div>
            <div className="expense-date__day">{date.day}</div>
            <div className="expense-date__year">{date.year}</div>
        </div>
    )
}

export default ExpenseDate;