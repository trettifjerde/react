import { Params } from "react-router-dom";

export type SuggestionWord = {id: number, word: string};
export type Language = 'hrv' | 'en';
export type CommonTask = {source: string, target: string, extras: string[]};
export type TranslationTask = {source: string, target: string, extras: string[], suggestions: SuggestionWord[]};
export type GrammarTask = {start: string, end: string, form: string, word: string, suggestions: string[]}
export type Feedback = true | false | null;
export type LoaderArgs = {request: Request, params: Params};
