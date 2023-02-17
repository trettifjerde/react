import Card from "../UI/Card";
import MealItem from "./MealItem";
import './AvailableMeals.css';
import { useEffect, useCallback, useState } from 'react';

const AvailableMeals = () => {
  console.log('Available Meals');
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMeals = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://academind34-default-rtdb.europe-west1.firebasedatabase.app/meals.json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }});

        if (!response.ok) throw new Error('Failed to fetch meals');

        const data = await response.json();

        const convertedData = data ? Object.entries(data).map(([id, meal]) => ({...meal, id: id})) : [];

        setMeals(convertedData);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }, []);


    let content = <p>No meals currently available</p>;
    if (isLoading) {
      content = <p>Loading...</p>;
    }     
    else if (error) {
      content = (
      <Card className="card-appear">
        <div class="c">
          <p>{error.message}</p>
          <button type="button" onClick={fetchMeals}>Try again</button>
        </div>
      </Card>);
    }  
    else if (meals.length > 0) {
      content = <ul> { meals.map(meal => <MealItem key={meal.id} item={meal} />) } </ul>;
    }

    useEffect(() => {
      fetchMeals();
    }, [fetchMeals]);

    return <section className="meals">
      <Card className="card-appear"> 
        {content}
      </Card>
    </section>
}

export default AvailableMeals;