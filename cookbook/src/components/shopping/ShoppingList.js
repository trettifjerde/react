import { Fragment, useCallback, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { generalActions } from '../../store/store';
import { shoppingListActions } from '../../store/shoppingListState';
import { deleteIngredient } from '../../helpers/dataService';

import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = () => {
    const {items} = useSelector(state => state.shoppingList);
    const dispatch = useDispatch();

    const editItem = useCallback(item => {
        dispatch(shoppingListActions.selectItem(item));
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [dispatch]);

    const deleteItem = useCallback(async id => {
        const isConfirmed = window.confirm('Delete item?');
        if (isConfirmed) {
            const response = await deleteIngredient(id);
            if ('error' in response) {
                dispatch(generalActions.announceError(response.error));
            }
            dispatch(shoppingListActions.deleteItem(id));
        }
    }, [dispatch]);


    return (
        <Fragment>
            { items.length > 0 && <div className="list-group">
                {items.map(item => (
                    <ShoppingListItem 
                        key={item.id} 
                        item={item}
                        onEdit={editItem}
                        onDelete={deleteItem}
                     />))}
            </div>}

            { items.length === 0 && <div>No items in the list</div>}
        </Fragment>
    )
}
export default ShoppingList;