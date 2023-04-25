import { Pronoun } from "../data/grammarTypes";
import { pickRandom } from "./common";

function makeVerbForm(verb: string, form: 'present' | 'imperative' = 'present') {
    const stem = verb.slice(0, -3);
    const group = verb.slice(-3, -2);
    let e;
    switch (group) {
        case 'a':
            e = form === 'imperative' ? 'aj' : 'aju';
            break;
        case 'e':
            e = form === 'imperative' ? 'i' : 'u';
            break;
        case 'i':
            e = form === 'imperative' ? 'i' : 'e';
            break;
    }
    return e ? stem + e : '';
}
export function makePresentForms(verb: string) {
    const stem = verb.slice(0, -2);
    return ['m', 'š', '', 'mo', 'te'].map(e => stem + e).concat([makeVerbForm(verb)]);
}

export function makePastForms(verb: string, extraA=false) {
    const stem = verb.slice(0, -2);
    return [extraA? 'ao' : 'o', 'la', 'lo', 'li', 'le', 'la'].map(e => stem + e);
}

export function makeImperatives(verb: string) : [string, string] {
    const form = makeVerbForm(verb, 'imperative');
    return [form, form + 'te'];
}

export const getRandomPronoun : (index: number) => Pronoun = (index) => {
    switch(index) {
        case 0:
            return 'ja';
        case 1:
            return 'ti';
        case 2:
            return pickRandom(['on', 'ona', 'ono']) as Pronoun
        case 3: 
            return 'mi'
        case 4: 
            return 'vi'
        default: 
            return pickRandom(['oni', 'one']) as Pronoun
    }
}
