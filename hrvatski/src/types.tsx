export type SuggestionWord = {id: number, word: string};
export type Language = 'hrv' | 'en';
export type TranslationTask = {source: string, target: string, extras: string[], suggestions: SuggestionWord[]};
export type CommonTask = {source: string, target: string, extras: string[]};
export type Feedback = true | false | null;