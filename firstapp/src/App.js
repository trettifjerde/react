import ExpenseList from "./components/Expenses/ExpenseList";

function App() {
  const expenses = [
    {
      title: 'Car Insurance',
      amount: 278.67,
      date: new Date(2022, 2, 28)
    },
    {
      title: 'Rent',
      amount: 450,
      date: new Date(2022, 2, 1)
    },
    {
      title: 'Groceries',
      amount: 26.8,
      date: new Date(2022, 2, 15)
    },
    {
      title: 'Rent',
      amount: 450,
      date: new Date(2022, 3, 1)
    },

  ]
  return (
    <div>
      <h2>Let's get started!</h2>
      <ExpenseList expenses={expenses}/>
    </div>
  );
}

export default App;
