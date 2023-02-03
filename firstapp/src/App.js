import ExpenseList from "./components/Expenses/ExpenseList";
import NewExpense from "./components/Expenses/NewExpense";

function App() {
  const expenses = [
    {
      title: 'Car Insurance',
      amount: 278.67,
      date: new Date(2022, 2, 28),
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
  let currentLastId = expenses.length;

  const saveExpenseData = (data) => expenses.push({...data, id: ++currentLastId});

  return (
    <div>
      <NewExpense onSaveExpenseData={saveExpenseData}/>
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
