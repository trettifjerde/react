import { croatian, english } from "../data/berlitz/berlitz";
import { extrasDict } from "../data/grammarData";
import { VERBS } from "../data/verbs";
import { LABELED_NOUNS, NOUNS } from "../data/nouns";
import { Casus, Verb, nounLabels as nl } from "../data/grammarTypes";
import { CommonTask, CorpusVocabulary, GrammarTask, Language, SuggestionWord } from "../types";
import { pickRandom, pickRandomIndex, shuffle } from "./common";

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

function makeOneVerbTasks(verb: string) {
    const forms = VERBS[verb].pres;
    const tasks: GrammarTask[] = [];
    const endings = makeVerbEndings(verb);

    for (let i = 0; i < 11; i++) {
        const j = pickRandomIndex(forms.length);
        tasks.push({
            start: pickRandomSubject(j, VERBS[verb]),
            end: pickRandom(endings),
            form: forms[j],
            word: verb,
            suggestions: shuffle(forms)
        })
    }
    return tasks;
}

function makeShuffledVerbsTask() {
    const tasks: GrammarTask[] = [];
    const endings: {[key: string] : string[]} = {};
    const nVerbs = Object.entries(VERBS).filter(([verb, info]) => info.aspect === 'n').map(([verb, info]) => verb);

    for (let i = 0; i < 11; i++) {
        const verb = pickRandom(nVerbs);
        const forms = VERBS[verb].pres;
        if (!(verb in endings)) {
            endings[verb] = makeVerbEndings(verb);
        }
        const ends = endings[verb];
        const j = pickRandomIndex(forms.length);
        tasks.push({
            start: pickRandomSubject(j, VERBS[verb]),
            end: pickRandom(ends),
            form: forms[j],
            word: verb,
            suggestions: shuffle(forms)
        })
    }
    return tasks;
}

export function makeGrammarTasks(task: string) {
    let tasks: GrammarTask[];
    switch(task) {
        case 'biti':
            tasks = makeOneVerbTasks('biti');
            break;
        case 'prezent':
            tasks = makeShuffledVerbsTask();
            break;
        default:
            tasks = makeOneVerbTasks(pickRandom(Object.keys(VERBS)))
    }
    return {tasks, instruction: 'Put the verb in the correct form'};
}

function generateSubject(verb: Verb, sg: boolean) {
    const sub = verb.subjects.reduce((acc, label) => {
        acc.push(...LABELED_NOUNS[label].map(noun => sg ? noun : NOUNS[noun].forms[1].N))
        return acc;
    }, [] as string[]);
    return sub;
}

function makeNounForm(noun: string, form: Casus, sg=true, prep='') {
    let prepos: string;
    switch(prep) {
        case 's':
            prepos = ['s', 'š', 'z', 'ž'].includes(noun[0]) || ['s', 'š', 'z', 'ž'].includes(noun[1]) ? 'sa' : 's';
            break;
        default:
            prepos = prep;
    }
    return `${prepos ? prepos + ' ': ''}${NOUNS[noun].forms[sg ? 0 : 1][form]}`;
}

function pickRandomObject(verb: Verb, nouns: string[]) {
    const filtered = nl.any in verb.objects ? nouns : nouns.filter(noun => NOUNS[noun].labels.some(label => label in verb.objects));
    if (filtered.length > 0) {
        const noun = pickRandom(filtered);
        const label = NOUNS[noun].labels.find(label => label in verb.objects) || nl.any;
        const [casus, prep] = verb.objects[label];
        return makeNounForm(noun, casus, true, prep);
    }
    else return '';
}

function pickRandomSubject(j: number, verb: Verb) {
    switch(j) {
        case 0:
            return 'ja';
        case 1:
            return 'ti';
        case 3: 
            return 'mi'
        case 4: 
            return 'vi'
        case 2:
            return pickRandom(generateSubject(verb, true))
        case 5: 
            return pickRandom(generateSubject(verb, false))
        default:
            return 'ja'
    }
}

function makeVerbEndings(verb: string) {
    const endings = VERBS[verb].extras.reduce((acc, v) => {
        if (v in extrasDict)
            acc.push(...extrasDict[v])
        return acc;
    }, [] as string[]);
    return endings;
}

export function makeNegationsTasks(vocabulary: CorpusVocabulary) {
    const tasks: CommonTask[] = [];
    if (vocabulary.verbs) {
        for (const verb of vocabulary.verbs) {
            const verbInfo = VERBS[verb];
            if (!verbInfo)
                continue;

            const i = pickRandomIndex(6);
            const sentence = {
                start: pickRandomSubject(i, verbInfo),
                end: pickRandomObject(verbInfo, vocabulary.nouns!)
            }
            const task = {
                source: `${sentence.start ? sentence.start : ''} (${verb}) ${sentence.end ? sentence.end : ''}`,
                target: [sentence.start, verbInfo.neg ? verbInfo.neg[i] : `ne ${verbInfo.pres[i]}`, sentence.end].filter(p => p).join(' ').trim(),
                extras: []
            };
            tasks.push(task);
        };
    }
    return tasks;
}