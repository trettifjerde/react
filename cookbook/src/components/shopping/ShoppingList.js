import { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { generalActions } from "../../store/generalState";
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
            dispatch(generalActions.setSubmitting(true));

            const response = await deleteIngredient(id);
            if ('error' in response) {
                dispatch(generalActions.flashToast({text: response.error.message, isError: true}));
            };

            dispatch(shoppingListActions.deleteItem(id));
            dispatch(generalActions.flashToast({text: 'Item removed', isError: false}));
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

            { items.length === 0 && <div className="text-center">No items in the list</div>}
        </Fragment>
    )
}
export default ShoppingList;