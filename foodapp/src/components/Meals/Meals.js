import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
    console.log('Meals');
    return <Fragment>
            <MealsSummary />
            <AvailableMeals />
        </Fragment>
}
export default Meals;