import { useCallback, useState } from 'react';
import Form from './components/form/form';
import Header from './components/header/header';
import Table from './components/table/table';

function App() {

  const [data, setData] = useState({initialInvestment: 0, yearlyData: []});

  console.log('App');
  console.log(data);

  const resetHandler = useCallback(() => setData([]), [setData]);

  const calculateHandler = useCallback((userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
    const yearlyData = []; // per-year results

    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    const data = {initialInvestment: currentSavings};

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    data.yearlyData = [...yearlyData];
    setData(data);

    // do something with yearlyData ...
  }, [setData]);

  return (
    <div>
      <Header />
      <Form onSubmit={calculateHandler} onReset={resetHandler}/>
      <Table data={data} />
    </div>
  );
}

export default App;
