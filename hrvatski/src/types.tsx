export type SuggestionWord = {id: number, word: string};
export type Language = 'hrv' | 'en';
export type TranslationTask = {source: string, target: string, suggestions: SuggestionWord[]};
export type TranslationFeedback = true | false | null;