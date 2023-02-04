import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';

function ExpenseItem(props) {

    return (
        <li id={props.item.id}>
            <Card className="expense-item">
                <ExpenseDate date={props.item.date} />
                <div className="expense-item__description">
                    <h2>{props.item.title}</h2>
                    <div className="expense-item__price">$ {props.item.amount}</div>
                </div>
            </Card>
        </li>
    )
}

export default ExpenseItem;