import { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { generalActions } from "../../store/generalState";
import { shoppingListActions } from '../../store/shoppingListState';
import { deleteIngredient } from '../../helpers/dataService';

import ShoppingListItem from "./ShoppingListItem";
import ConfirmationModal from "../ConfirmationModal";
import '../../components/Modal.css';

const ShoppingList = () => {
    const {items} = useSelector(state => state.shoppingList);
    const [itemToDeleteInfo, setItemToDeleteInfo] = useState({
        visible: false, 
        name: '', 
        id: null
    }); 
    const dispatch = useDispatch();

    const editItem = useCallback(item => {
        dispatch(shoppingListActions.selectItem(item));
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [dispatch]);

    const askDeleteConfirm = useCallback((name, id) => setItemToDeleteInfo({visible: true, name, id}), [setItemToDeleteInfo]);

    const closeModal = useCallback(() => setItemToDeleteInfo(prev => ({...prev, visible: false})), [setItemToDeleteInfo]);

    const deleteItem = useCallback(async id => {
        closeModal();

        dispatch(generalActions.setSubmitting(true));

        const response = await deleteIngredient(id);
        if ('error' in response) {
            dispatch(generalActions.flashToast({text: response.error.message, isError: true}));
        };

        dispatch(shoppingListActions.deleteItem(id));
        dispatch(generalActions.flashToast({text: 'Item removed', isError: false}));
    }, [dispatch, closeModal]);

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
                </div> 
            }

            { items.length === 0 && <div className="text-center">No items in the list</div>}

            <ConfirmationModal question="Delete item" info={itemToDeleteInfo} onClose={closeModal} onConfirm={deleteItem}  />
        </Fragment>
    )
}
export default ShoppingList;