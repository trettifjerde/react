import { createStore } from 'redux';

export const actions = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
}

const reducer = (state={counter: 0}, action) => {
    switch(action.type) {
        case actions.INCREMENT:
            return {counter: state.counter + 1};
        case actions.DECREMENT:
            return {counter: state.counter - 1};
        default: 
            return state;
    }
}

const store = createStore(reducer);

export default store;