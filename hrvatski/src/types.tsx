import { Params } from "react-router-dom";

export type TaskType = 'write' | 'translate' | 'negations';
export type Language = 'hrv' | 'en';
export type CorpusLabel = 'basics' | 'common phrases' | 'questions' | 'negations';

export type CorpusEntry = {
    hrv: string,
    en: string,
    labels: CorpusLabel[]
};

export type CorpusVocabulary = {
    verbs?: string[],
    nouns?: string[],
    adjectives?: string[],
    adverbs?: string[]
}
export type TaskLevel = {
    name: string,
    path: string,
    tasks: TaskType[]
    sentences: CorpusEntry[],
    vocabulary: CorpusVocabulary,
}

export type CommonTask = {source: string, target: string, extras: string[]};
export type TranslationTask = {source: string, target: string, extras: string[], suggestions: SuggestionWord[]};
export type SuggestionWord = {id: number, word: string};
export type GrammarTask = {start: string, end: string, form: string, word: string, suggestions: string[]}

export type Feedback = true | false | null;
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

export type TaskAction = {type: ActionType,payload?: any};
export type TaskReducer<T> = (state: TaskState<T>, action: TaskAction) => TaskState<T>;
export type TaskStoreConfig<T> = {reducer: TaskReducer<T>, initState: TaskState<T>};

export type LoaderArgs = {request: Request, params: Params};
export type PathsInfo = {
    paths: {name: string, path: string}[],
    back: boolean
}
