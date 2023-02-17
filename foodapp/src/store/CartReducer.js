export const cartActions = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    EMPTY_CART: 'EMPTY_CART'
};

export const cartInitialState = {
    totalAmount: 0,
    items: [],
};

const roundFloat = (n) => Math.round(n * 100 + Number.EPSILON ) / 100;

export const cartReducer = (state, action) => {
    console.log('cart reducer');
    if (action.type === cartActions.ADD_ITEM) {
        const itemToAdd = action.payload;
        const itemI = state.items.findIndex(i => i.id === itemToAdd.id);
        /*

        return {
            ...state,
            totalAmount: state.totalAmount + itemToAdd.price * itemToAdd.amount,
            items: (
                (itemI > -1) ? (
                    state.items.map((item, i) => (i === itemI) ? { ...item, amount: item.amount + itemToAdd.amount } : item)
                ) : (
                    state.items.concat(itemToAdd)
                )
            )
        };
        */
        const updatedItems = [...state.items];

        if (itemI === -1) {
            updatedItems.push(itemToAdd);
        }
        else {
            const existingItem = state.items[itemI];
            updatedItems[itemI] = { ...existingItem, amount: existingItem.amount + itemToAdd.amount }
        }

        return {
            ...state,
            totalAmount: roundFloat(state.totalAmount + itemToAdd.price * itemToAdd.amount),
            items: updatedItems
        };
    }
    else if (action.type === cartActions.REMOVE_ITEM) {

        /*
        const { id, amount } = action.payload;
        const itemToRemove = state.items.find(i => i.id === id);

        return {
            ...state,
            totalAmount: state.totalAmount - itemToRemove.price * amount,
            items: (
                (itemToRemove.amount === amount) ? (
                    state.items.filter(item => item.id !== id)
                ) : (
                    state.items.map(item => (item.id === id) ? { ...item, amount: item.amount - amount } : item)
                )
            )
        };
        */
        const { id, amount } = action.payload;
        const itemI = state.items.findIndex(item => item.id === id);
        const existingItem = state.items[itemI];
        const updatedItems = [...state.items];

        if (existingItem.amount === amount) {
            updatedItems.splice(itemI, 1);
        }
        else {
            updatedItems[itemI] = {...existingItem, amount: existingItem.amount - amount};
        }

        return {
            ...state,
            items: updatedItems,
            totalAmount: roundFloat(state.totalAmount - existingItem.price * amount)
        }

    }
    else if (action.type === cartActions.EMPTY_CART) {
        return cartInitialState;
    }
    else {
        return state;
    }
};