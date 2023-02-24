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

    return (
        <div className="list-group-item ingredient interactive">
            <div className="ingredient-text">{getitemredInfo()}</div>
            <div className="btn-group-sm">
                <button className="btn btn-outline-warning" onClick={onEdit.bind(null, item)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={onDelete.bind(null, item.id)}>Delete</button>
            </div>
        </div>
    )
}
export default ShoppingListItem;