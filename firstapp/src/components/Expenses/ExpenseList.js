import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import './ExpenseList.css';

function ExpenseList(props) {
    return (
        <Card className="expenses">
            <ExpenseItem item={props.expenses[0]}/>
            <ExpenseItem item={props.expenses[1]}/>
            <ExpenseItem item={props.expenses[2]}/>
            <ExpenseItem item={props.expenses[3]}/>
        </Card>
    )
}

export default ExpenseList;