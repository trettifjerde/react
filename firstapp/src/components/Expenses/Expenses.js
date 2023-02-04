import Card from "../UI/Card";
import ExpenseList from "./ExpenseList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import './Expenses.css';

function Expenses(props) {
    const filteredExpenses = props.expenses.filter(e => e.date.getFullYear() === props.selectedYear).sort((a,b) => a.date > b.date ? 1 : -1);

    return (
        <Card className="expenses">
            <ExpensesChart expenses={filteredExpenses} />
            <ExpensesFilter selectedYear={props.selectedYear} onChangeYear={props.onSelectYear}/>
            <ExpenseList items={filteredExpenses} />
        </Card>
    )
}

export default Expenses;