import { Feedback,  TaskState, TaskReducer, ActionType } from "../types";

export const makeInitState: 
    <T>(makeTasks: () => {tasks: T[], instruction: string}) => TaskState<T> = 
    (makeTasks) => {
        const {tasks, instruction} = makeTasks();
        return { i: 0,
            score: 0,
            lives: 3,
            feedback: null,
            complete: false,
            tasks, instruction
        }
    }

export const initStore : <T>
    (
        getInitState: () => TaskState<T>,
        checkTask: (task: T, answer: string) => Feedback
    ) => {reducer: TaskReducer<T>, initState: TaskState<T>} = 
    
    (getInitState, checkTask) => {
        return {
            reducer: (state, action) => {
            switch (action.type) {
                case ActionType.INIT:
                    console.log('initing state');
                    const iState = getInitState();
                    console.log(iState);
                    return iState;
                case ActionType.CHECK:
                    const feedback = checkTask(state.tasks[state.i], action.payload);
                    return {
                        ...state,
                        feedback: feedback,
                        score: feedback ? state.score + 1 : state.score,
                        lives: feedback ? state.lives : state.lives - 1
                    }
                case ActionType.NEXT:
                    return {...state, i: state.i + 1, answers: [], feedback: null}
                case ActionType.SUCCESS:
                    return {...state, complete: true}
                case ActionType.FAIL:
                    return {...state, complete: true};
                default:
                    return state;
            }
        }, 
        initState: getInitState()
    };
}