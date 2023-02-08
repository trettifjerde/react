import MealItemForm from './MealItemForm';
import './MealItem.css';

const MealItem = (props) => {
    return (
        <li className="meal">
            <div>
                <h3>{props.item.name}</h3>
                <div>{props.item.description}</div>
                <div>${props.item.price.toFixed(2).toString()}</div>
            </div>
            <MealItemForm item={props.item}/>
        </li>
    )
}
export default MealItem;