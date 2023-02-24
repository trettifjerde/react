import { useSelector } from 'react-redux';
import { Fragment, useCallback, useRef } from "react";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = () => {
    const {ingredients} = useSelector(state => state.shoppingList);
    const ingredientsCont = useRef();

    const editItem = useCallback(ingred => {

    }, []);
    const deleteItem = useCallback(id => {
        
    }, []);


    return (
        <Fragment>
            { ingredients.length > 0 && <div className="list-group" ref={ingredientsCont}>
                {ingredients.map(ingred => (
                    <ShoppingListItem 
                        key={ingred.id} 
                        item={ingred}
                        onEdit={editItem}
                        onDelete={deleteItem}
                     />))}
            </div>}

            { ingredients.length === 0 && <div>No ingredients in the list</div>}
        </Fragment>
    )
}
export default ShoppingList;