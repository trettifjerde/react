import { useCallback } from "react";

const ShoppingListItem = (props) => {
    const {item, onEdit, onDelete} = props;

    const getitemredInfo = useCallback(() => {
        let info = item.name;
        if (item.amount) {
            info += ` (${item.amount}`;
            if (item.unit) {
                info += ` ${item.unit}`;
            }
            info += ')';
        }
        return info;
    }, [item]);

    const editItem = useCallback(() => onEdit(item), [item, onEdit]);
    const deleteItem = useCallback(() => onDelete(item.name, item.id), [item, onDelete]);

    return (
        <div className="list-group-item ingredient interactive">
            <div className="ingredient-text">{getitemredInfo()}</div>
            <div className="btn-group-sm">
                <button className="btn btn-outline-warning" onClick={editItem}>Edit</button>
                <button className="btn btn-outline-danger" onClick={deleteItem}>Delete</button>
            </div>
        </div>
    )
}
export default ShoppingListItem;