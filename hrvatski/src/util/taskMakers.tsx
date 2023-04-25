import { croatian, english } from "../data/berlitz/berlitz";
import { VERBS, extrasDict, subjects } from "../data/grammarData";
import { CommonTask, GrammarTask, Language, SuggestionWord } from "../types";
import { pickRandom, pickRandomIndex, shuffle } from "./common";
import { getRandomPronoun } from "./grammar";

export function makeSuggestionWords(phrase: string, targetLang: Language, maxWords=4): SuggestionWord[] {
    const targetDict = targetLang === 'hrv' ? croatian : english;
    const words = [...phrase.split(' ')];
    
    for (let i = 0; i < maxWords; i++) {
        const j = Math.floor(Math.random() * targetDict.length);
        words.push(targetDict[j]);
    }
    
    const extraWords = shuffle(words);

    return extraWords.map((word, i) => ({id: i, word: word}));
}

function makeOneVerbTasks(verb: string) : GrammarTask[]{
    const forms = VERBS[verb].pres;
    const tasks: GrammarTask[] = [];
    const endings = makeVerbEndings(verb);

    for (let i = 0; i < 11; i++) {
        const j = pickRandomIndex(forms.length);
        tasks.push({
            start: pickRandomSubject(j),
            end: pickRandom(endings),
            form: forms[j],
            word: verb,
            suggestions: shuffle(forms)
        })
    }
    return tasks;
}

function makeShuffledVerbsTask() : GrammarTask[] {
    const tasks: GrammarTask[] = [];
    const endings: {[key: string] : string[]} = {};
    const nVerbs = Object.entries(VERBS).filter(([verb, info]) => info.aspect === 'n').map(([verb, info]) => verb);
    console.log(nVerbs);

    for (let i = 0; i < 11; i++) {
        const verb = pickRandom(nVerbs);
        const forms = VERBS[verb].pres;
        if (!(verb in endings)) {
            endings[verb] = makeVerbEndings(verb);
        }
        const ends = endings[verb];
        const j = pickRandomIndex(forms.length);
        tasks.push({
            start: pickRandomSubject(j),
            end: pickRandom(ends),
            form: forms[j],
            word: verb,
            suggestions: shuffle(forms)
        })
    }
    return tasks;
}

export function makeGrammarTasks(task: string) : GrammarTask[] {
    switch(task) {
        case 'biti':
            return makeOneVerbTasks('biti');
        case 'prezent':
            return makeShuffledVerbsTask();
        default:
            return makeOneVerbTasks(pickRandom(Object.keys(VERBS)))
    }
}

function pickRandomSubject(j: number) {
    return pickRandom(subjects[getRandomPronoun(j)]);
}

function makeVerbEndings(verb: string) {
    const endings = VERBS[verb].extras.reduce((acc, v) => {
        acc.push(...extrasDict[v])
        return acc;
    }, [] as string[]);
    return endings;
}

export function makeNegationsTasks(verbs: string[]) {
    const tasks: CommonTask[] = [];
    const endings: {[key: string]: string[]} = {};
    for (const verb of verbs) {
        const verbInfo = VERBS[verb];
        if (!verbInfo)
            continue;

        const i = pickRandomIndex(6);
        if (!(verb in endings)) endings[verb] = makeVerbEndings(verb);
        const sentence = {
            start: pickRandomSubject(i),
            end: pickRandom(endings[verb])
        }
        const task = {
            source: [sentence.start, verb, sentence.end].filter(p => p).join(', '),
            target: [sentence.start, verbInfo.neg ? verbInfo.neg[i] : `ne ${verbInfo.pres[i]}`, sentence.end].filter(p => p).join(' ').trim(),
            extras: []
        };
        tasks.push(task);
    };

    return tasks;
}