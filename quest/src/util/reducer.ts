import { Action } from "./actions";
import { TASKS } from "./data";
import { State, Task } from "./types";

export type AppState = {
    name: State,
    task: Task,
    i: number,
};

export const initializer : () => AppState = () => ({
    name: 'launcher',
    task: TASKS[0],
    i: 0,
});

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'START_GREET':
            return {
                ...state, 
                name: 'greeting-enter'
            }
        case 'END_GREET':
            return {
                ...state,
                name: 'greeting-exit'
            }
        case 'START_TASK':
            return {
                ...state, 
                name: 'task-enter',
                i: action.i,
                task: TASKS[action.i]
            }
        case 'END_TASK':
            return {
                ...state,
                name: 'task-exit'
            }
        case 'CONGRATULATE':
            return {
                ...state,
                name: 'congrats'
            }
        case 'GIVE_REWARD':
            return {
                ...state, 
                name: 'reward'
            }
        default:
            return state;
    }
}