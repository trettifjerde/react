import { sentences } from "../data/translateData";
import { Language, TranslationFeedback, TranslationTask } from "../types";
import { makeSuggestionWords } from "../util/translate";
import * as a from "./translationActions";

export type TranslationState = {
    tasks: TranslationTask[],
    answers: number[],
    i: number,
    complete: boolean,
    score: number,
    feedback: TranslationFeedback,
}

export const initialTranslationState: TranslationState = {
    tasks: [{source: '', target: '', suggestions: [{id: 0, word: ''}]}],
    answers: [],
    i: 0,
    complete: false,
    score: 0,
    feedback: null
}

const translationStateReducer = (state: TranslationState, action: a.TranslationAction) => {
    if (action instanceof a.TransInitAction) 
        return makeInitTransState(action.lang, action.maxQ);
    if (action instanceof a.TransCheckAnswer) {
        const task = state.tasks[state.i];
        const feedback = task.target === state.answers.map(i => task.suggestions[i].word).join(' ');
        return {
            ...state,
            feedback: feedback,
            score: feedback ? state.score + 1 : state.score
        }
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
        tasks: makeTasks(targetLang, maxQ)
    }
}

function makeTasks(targetLang: Language, maxQ: number) {
    const sourceLang = targetLang === 'hrv' ? 'en' : 'hrv';
    let data = [...sentences];
    let tasks = [];

    while(tasks.length < maxQ) {
        const i = Math.floor(Math.random() * data.length);
        const pair = data.splice(i, 1);
        const source = pair[0][sourceLang];
        const target = pair[0][targetLang];
        const suggestions = makeSuggestionWords(target, targetLang);
        tasks.push({source: source, target: target, suggestions: suggestions.map((s, i) => ({id: i, word: s}))});
    }
    return tasks;
}

export default translationStateReducer;