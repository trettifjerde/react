import { sentences } from "../data/translateData";
import { Language, Feedback, TranslationTask } from "../types";
import { makeTasks } from "../util/common";
import { makeSuggestionWords } from "../util/translate";
import * as a from "./translationActions";

export type TranslationState = {
    tasks: TranslationTask[],
    answers: number[],
    i: number,
    complete: boolean,
    score: number,
    feedback: Feedback,
    lives: number
}

const translationStateReducer = (state: TranslationState, action: a.TranslationAction) => {
    if (action instanceof a.TransInitAction) 
        return makeInitTransState(action.lang, action.maxQ);
    if (action instanceof a.TransCheckAnswer) {
        const task = state.tasks[state.i];
        const feedback = checkTranslationTask(task, state.answers);
        return {
            ...state,
            feedback: feedback,
            score: feedback ? state.score + 1 : state.score,
            lives: feedback ? state.lives : state.lives - 1
        }
    }
    if (action instanceof a.TransFail) {
        return {...state, complete: true};
    }
    if (action instanceof a.TransSelect)
        return {...state, answers: [...state.answers, action.wordId]}
    if (action instanceof a.TransUnselect) 
        return {...state, answers: state.answers.filter(i => i !== action.wordId)}
    if (action instanceof a.TransNextQuestion) 
        return {...state, i: state.i + 1, answers: [], feedback: null}
    if (action instanceof a.TransComplete) 
        return {...state, complete: true}
    return state;
};

export function makeInitTransState(targetLang: Language, maxQ: number=sentences.length): TranslationState {
    return {
        i: 0,
        answers: [],
        complete: false,
        score: 0,
        feedback: null,
        tasks: makeTranslationTasks(targetLang, maxQ),
        lives: 3
    }
}

function makeTranslationTasks(targetLang: Language, maxQ: number): TranslationTask[] {
    return makeTasks(targetLang, maxQ).map(task => ({...task, suggestions: makeSuggestionWords(task.target, targetLang, 4)}));
}

function checkTranslationTask(task: TranslationTask, answers: number[]) {
    const answer = answers.map(i => task.suggestions[i].word).join(' ');
    return answer === task.target || task.extras.includes(answer);
}

export default translationStateReducer;