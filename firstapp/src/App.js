import { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/Expenses/NewExpense";

function App() {
  const initialExpenses = [
    {
      title: 'Car Insurance',
      amount: 278.67,
      date: new Date(2022, 1, 28),
      id: 1
    },
    {
      title: 'Rent',
      amount: 450,
      date: new Date(2022, 2, 1),
      id: 2
    },
    {
      title: 'Groceries',
      amount: 26.8,
      date: new Date(2022, 2, 15),
      id: 3
    },
    {
      title: 'Rent',
      amount: 450,
      date: new Date(2022, 3, 1),
      id: 4
    },
  ];

  const [expenses, setExpenses] = useState(initialExpenses);
  const [selectedYear, setYear] = useState(2022);

  const saveExpenseDataHandler = (newExpense) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, {id: expenses.length + 1, ...newExpense}];
    })
    setYear(newExpense.date.getFullYear());
  };

  const selectYearHandler = (year) => setYear(year);

  return (
    <div>
      <NewExpense onSaveExpenseData={saveExpenseDataHandler}/>
      <Expenses expenses={expenses} selectedYear={selectedYear} onSelectYear={selectYearHandler} />
    </div>
  );
}

export default App;
