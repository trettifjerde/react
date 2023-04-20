import { Feedback, Language, CommonTask } from "../types";
import { makeTasks } from "../util/common";
import { WriteAction, WriteCheckAction, WriteCompleteAction, WriteFailAction, WriteInitAction, WriteNextAction } from "./writeActions";

export type WriteState = {
    i: number,
    complete: boolean,
    score: number,
    tasks: CommonTask[],
    feedback: Feedback,
    lives: number
}

export function writeReducer(state: WriteState, action: WriteAction) {
    if (action instanceof WriteInitAction) {
        return makeInitWriteState(action.targetLang, action.maxQ)
    }
    if (action instanceof WriteCheckAction) {
        const feedback = checkTranslation(action.input, state.tasks[state.i]);
        return {...state, feedback: feedback, score: feedback ? state.score + 1 : state.score, lives: feedback ? state.lives : state.lives - 1}
    }
    if (action instanceof WriteNextAction) {
        return {...state, i: state.i + 1, feedback: null}
    }
    if (action instanceof WriteCompleteAction) {
        return {...state, complete: true}
    }
    if (action instanceof WriteFailAction) {
        return {...state, complete: true}
    }
    return state;
}

export function makeInitWriteState(targetLang: Language, maxQ: number) : WriteState {
    return {
        i: 0,
        complete: false,
        score: 0,
        feedback: null,
        tasks: makeTasks(targetLang, maxQ),
        lives: 3
    }
}

function checkTranslation(answer: string, task: CommonTask) {
    return task.target.toLowerCase() === answer.toLowerCase() || task.extras.includes(answer.toLowerCase());
}