import { Declination, Gender, Pronoun } from "../data/grammarTypes";
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

function makeInterchange(stem: string) {
    if (stem.endsWith('k'))
        return stem.slice(0, -1) + 'c';
    else if (stem.endsWith('g'))
        return stem.slice(0, -1) + 'z';
    else
        return stem;
}

export function makeNounForms(noun: string, gender: Gender, animate=false) {
    let stem: string;
    let d: [Declination, Declination];
    switch (gender) {
        case 'm':
            stem = noun;
            d = [{
                N: noun,
                G: stem + 'a',
                D: stem + 'u',
                A: stem,
                I: stem + 'om',
                L: stem + 'u',
                V: stem + 'e'
            },
            {
                N: makeInterchange(stem) + 'i',
                G: stem + 'a',
                D: makeInterchange(stem) + 'ima',
                A: stem + 'e',
                I: makeInterchange(stem) + 'ima',
                L: makeInterchange(stem) + 'ima',
                V: makeInterchange(stem) + 'i'
            }];
            if (['c', 'ć', 'č', 'lj', ].some(e => stem.endsWith(e)))
                d[0].I = stem + 'em'
            if (animate)
                d[0].A = stem + 'a';
            break;
        case 'f':
            let fullDeclin = noun.endsWith('a');
            stem = fullDeclin ? noun.slice(0, -1) : noun;
            d = fullDeclin ? [{
                N: noun,
                G: stem + 'e',
                D: makeInterchange(stem) + 'i',
                A: stem + 'u',
                I: stem + (noun.endsWith('e') ? 'em' : 'om'),
                L: stem + 'i',
                V: stem + 'o'
            }, {
                N: stem + 'e',
                G: stem + 'a',
                D: stem + 'ama',
                A: stem + 'e',
                I: stem + 'ama',
                L: stem + 'ama',
                V: stem + 'e'
            }] : [{
                N: noun,
                G: stem + 'i',
                D: stem + 'i',
                A: noun,
                I: stem + 'i',
                L: stem + 'ju',
                V: noun
            }, {
                N: stem + 'i',
                G: stem + 'i',
                D: stem + 'ima',
                A: stem + 'i',
                I: stem + 'ima',
                L: stem + 'ima',
                V: stem + 'i'
            }];
            break;
        case 'n':
            stem = noun.slice(0, -1);
            let endsWithE = noun.endsWith('e');
            d = [{
                N: noun,
                G: stem + 'a',
                D: stem + 'u',
                A: noun,
                I: stem + (endsWithE ? 'em' : 'om'),
                L: stem + 'u',
                V: noun
            }, {
                N: stem + 'a',
                G: stem + 'a',
                D: makeInterchange(stem) + 'ima',
                A: stem + 'a',
                I: makeInterchange(stem) + 'ima',
                L: makeInterchange(stem) + 'ima',
                V: stem + 'a'
            }];
            break;
    }
    return d;
}
