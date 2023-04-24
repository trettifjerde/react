import { json } from "react-router-dom";
import { isValidBerlitzTaskParams } from "../data/translateData";
import { CommonTask, Feedback, Language, LoaderArgs, TranslationTask } from "../types";
import { makeTasks } from "../util/common";
import { makeSuggestionWords } from "../util/translate";

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

export type TaskStateInitConfig<T> = [(state: TaskState<T>, action: TaskAction) => TaskState<T>, TaskState<T>];

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
    ) => TaskStateInitConfig<T> = 
    
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

export const translateTaskLoader : (l: LoaderArgs) => TaskStateInitConfig<TranslationTask> | Response = ({request, params}) => {
    const targetLang = params.targetLang as Language;
    const task = params.task;
    if (targetLang && task && isValidBerlitzTaskParams(targetLang, task)) {
        const stateConfig = initStore(
            makeInitState(
            () => makeTasks(targetLang, task).map(task => ({...task, suggestions: makeSuggestionWords(task.target, targetLang, 4)}))),
            (task: TranslationTask, answer: string) => {
                return answer === task.target || task.extras.includes(answer.toLowerCase());
            }
        );
        return stateConfig;
    }
    throw json(404);
}

export const writeTaskLoader: (l: LoaderArgs) => TaskStateInitConfig<CommonTask> | Response = ({request, params}) => {
    const {targetLang, task} = params;
    if (targetLang && task && isValidBerlitzTaskParams(targetLang as Language, task)) {
        const stateConfig = initStore(
            makeInitState(() => makeTasks(targetLang as Language, task)),
            (task: CommonTask, answer: string) => {
                return answer === task.target || task.extras.includes(answer.toLowerCase());
            }
        );
        return stateConfig;
    }
    throw json(404);
}