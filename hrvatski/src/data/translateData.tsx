import { Language } from "../types";

function makeSet(language: Language) {
    const dict = new Set<string>();
    sentences
        .map(pair => pair[language])
        .forEach(sentence => {
            sentence
                .split(' ')
                .forEach(word => dict.add(word))
        });
    return Array.from(dict);
}
export const sentences : Array<{hrv: string, en: string}> = [
    {hrv: 'dobar dan', en: 'good day'},
    {hrv: 'dobra večer', en: 'good evening'},
    {hrv: 'dobro jutro', en: 'good morning'},
    {hrv: 'hvala', en: 'thank you'},
    {hrv: 'nema na čemu', en: 'you are welcome'},
    {hrv: 'samo trenutak', en: 'just a second'},
    {hrv: 'za danas je dosta', en: 'enough for today'},
    {hrv: 'drago mi je', en: 'nice to meet you'},
    {hrv: 'kako se kaže na engleskom', en: 'what is the English for'},
    {hrv: 'vidimo se', en: 'see you'}
]

export const croatian = makeSet('hrv');
export const english = makeSet('en');