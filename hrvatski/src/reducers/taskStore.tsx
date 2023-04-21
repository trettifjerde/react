import { Feedback } from "../types";

export type TaskState<Task> = {
    i: number,
    complete: boolean,
    feedback: Feedback,
    score: number,
    lives: number
    tasks: Task[],
}

export enum ActionType {
    INIT,
    CHECK,
    NEXT,
    SUCCESS,
    FAIL,
};

export type TaskAction = {
    type: ActionType,
    payload?: any
}

export const makeInitState: 
    <T>(makeTasks: () => T[]) => () => TaskState<T> = 
    (makeTasks) => {
        return () => ({ i: 0,
            score: 0,
            lives: 3,
            feedback: null,
            complete: false,
            tasks: makeTasks()
        })
    }

export const initStore : <T>
    (
        getInitState: () => TaskState<T>,
        checkTask: (task: T, answer: string) => Feedback
    ) => [(state: TaskState<T>, action: TaskAction) => TaskState<T>, TaskState<T>] = 
    
    (getInitState, checkTask) => {
        return [(state, action) => {
            switch (action.type) {
                case ActionType.INIT:
                    return getInitState();
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
        }, getInitState()];
}