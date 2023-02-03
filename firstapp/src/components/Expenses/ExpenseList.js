import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import './ExpenseList.css';
import { useState } from "react";

function ExpenseList(props) {
    const [selectedYear, setYear] = useState(2022);
    const filteredYearHandler = (year) => setYear(year);
    return (
        <Card className="expenses">
            <ExpensesFilter selectedYear={selectedYear} onChangeYear={filteredYearHandler}/>
            <ExpenseItem item={props.expenses[0]}/>
            <ExpenseItem item={props.expenses[1]}/>
            <ExpenseItem item={props.expenses[2]}/>
            <ExpenseItem item={props.expenses[3]}/>
            <p>{selectedYear}</p>
        </Card>
    )
}

export default ExpenseList;