import { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { generalActions } from "../../store/generalState";
import { shoppingListActions } from '../../store/shoppingListState';
import { deleteIngredient } from '../../helpers/dataService';

import ShoppingListItem from "./ShoppingListItem";
import ConfirmationModal from "../ConfirmationModal";

const ShoppingList = () => {
    const {items} = useSelector(state => state.shoppingList);
    const [itemToDeleteInfo, setItemToDeleteInfo] = useState(null); // or {question: string, bold: string, onConfirm: function(id: string) => void}
    const dispatch = useDispatch();

    const editItem = useCallback(item => {
        dispatch(shoppingListActions.selectItem(item));
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [dispatch]);

    const closeModal = useCallback(() => setItemToDeleteInfo(null), [setItemToDeleteInfo]);
    const deleteItem = useCallback(async id => {
        dispatch(generalActions.setSubmitting(true));

        const response = await deleteIngredient(id);
        if ('error' in response) {
            dispatch(generalActions.flashToast({text: response.error.message, isError: true}));
        };

        dispatch(shoppingListActions.deleteItem(id));
        dispatch(generalActions.flashToast({text: 'Item removed', isError: false}));
    }, [dispatch]);

    const askDeleteConfirm = useCallback((name, id) => setItemToDeleteInfo({
        question: 'Delete item', 
        bold: name,
        onConfirm: deleteItem.bind(null, id)
    }), [setItemToDeleteInfo, deleteItem]);


    return (
        <Fragment>
            { 
                items.length > 0 && <div className="list-group">
                    {
                        items.map(item => (
                            <ShoppingListItem 
                                key={item.id} 
                                item={item}
                                onEdit={editItem}
                                onDelete={askDeleteConfirm}
                            />))
                    }
                    { itemToDeleteInfo && <ConfirmationModal onClose={closeModal} confirmInfo={itemToDeleteInfo}/>}
                </div>
            }

            { items.length === 0 && <div className="text-center">No items in the list</div>}
        </Fragment>
    )
}
export default ShoppingList;