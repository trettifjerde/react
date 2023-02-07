import { getShuffledQuestions } from "../data/data";

export const actions = {
    START: "START",
    SELECT_OPTION: "SELECT_OPTION",
    UNSELECT: "UNSELECT",
    SET_RESULT: "SET_RESULT",
    ADD_EXTRA_QUESTION: "ADD_EXTRA_QUESTION"
};
  
export const initGame = (maxQLength) => {
    return {
        questions: getShuffledQuestions(maxQLength),
        isRunning: true,
        selectedOptions: [],
        result: null,
        extraQuestion: null
      };
}

export const initialState = {
    questions: [],
    isRunning: false,
    selectedOptions: [],
    result: null,
    extraQuestion: null
}

  
export const stateReducer = (state, action) => {
    switch(action.type) {
        case actions.START:
            return {...initGame(action.payload)}
        case actions.SELECT_OPTION:
            return {...state, selectedOptions: [...state.selectedOptions, action.payload]}
        case actions.UNSELECT:
            return {...state, selectedOptions: state.selectedOptions.slice(0, state.selectedOptions.length - 1)}
        case actions.SET_RESULT:
            return {...state, result: action.payload}
        case actions.ADD_EXTRA_QUESTION: {
            return {...state, extraQuestion: action.payload}
        }
        default:
            return state;
    }
};