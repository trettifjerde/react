export const cartActions = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM'
};

export const cartInitialState = {
    totalAmount: 0,
    items: [],
};

export const cartReducer = (state, action) => {
    switch (action.type) {
        case cartActions.ADD_ITEM:
            const { itemToAdd, amount } = action.payload;
            const itemI = state.items.findIndex(i => i.id === itemToAdd.id);

            return {
                ...state,
                totalAmount: state.totalAmount + itemToAdd.price * amount,
                items: (
                    (itemI > -1) ? (
                        state.items.map((item, i) => (i === itemI) ? { ...item, amount: item.amount + amount } : item)
                    ) : (
                        [...state.items, { ...itemToAdd, amount: amount }]
                    )
                )
            };

        case cartActions.REMOVE_ITEM:

            return {
                items: state.items.filter(item => item.id !== action.payload.id),
                totalAmount: state.totalAmount - action.payload.price
            };
        default:
            return state;
    }
};