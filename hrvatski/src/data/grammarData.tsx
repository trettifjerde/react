import { GrammarTask } from "../types";
import { shuffle } from "../util/common";


type VerbAspect = 'n' | 's';
export type VerbFormKey = 'pres' | 'past' | 'passive' | 'gerund' | 'imperative';

type VerbTaskPresent = {
    start: string,
    end: string,
    word: string,
    form: number
}

export type FormsDict = {
    [key: string]: {
        aspect: VerbAspect, 
        pres: string[], 
        past: string[],
        passive?: string[],
        gerund: string [],
        imperative: string[]
    };
};
export type GrammarTaskDict = VerbTaskPresent;


export const VERB_TASKS_PRESENT : VerbTaskPresent[] = [
    {start: 'ja ne', end: 'engleski', word: 'govoriti', form: 0},
    {start: 'on', end: 'iz Splita', word: 'biti', form: 2},
    {start: 'odakle', end: 'ti?', word: 'biti', form: 1},
    {start: 'oni', end: 'iz Zagreba', word: 'biti', form: 5},
    {start: 'Ivan i Marija dobro', end: 'hrvatski', word: 'govoriti', form: 5},
    {start: 'mi', end: 'u školi', word: 'biti', form: 3},
    {start: 'ja obično dugo', end: 'ujutro', word: 'spavati', form: 0},
    {start: 'prijatelji', end: 'zajedno na kavu', word: 'ići', form: 5},
    {start: 'mi', end: 'samo hrvatska jela', word: 'jesti', form: 3}
];

export const VERB_FORMS: FormsDict = {
    'biti': {
        aspect: 'n',
        pres: ['sam','si','je','smo','ste','su'],
        past: ['bio', 'bila', 'bilo', 'bili', 'bile', 'bila'],
        gerund: ['budući'],
        imperative: ['budi', 'budite']
    },
    'govoriti': {
        aspect: 'n',
        pres: ['govorim','govoriš','govori','govorimo','govorite','govore'],
        past: ['govorio', 'govorila', 'govorilo', 'govorili', 'govorile', 'govorila'],
        passive: ['govoren'],
        gerund: ['govoreći'],
        imperative: ['govori', 'govorite']
    },
    'jesti': {
        aspect: 'n',
        pres: ['jedem','jedeš','jede','jedemo','jedete','jedu'],
        past: ['jeo', 'jela', 'jelo', 'jeli', 'jele', 'jela'],
        passive: ['jeden'],
        gerund: ['jedući'],
        imperative: ['jedi', 'jedite']
    },
    'spavati': {
        aspect: 'n',
        pres: ['spavam','spavaš','spava','spavamo','spavate','spavaju'],
        past: ['spavao', 'spavala', 'spavalo', 'spavali', 'spavale', 'spavala'],
        gerund: ['spavajući'],
        imperative: ['spavaj', 'spavajte']
    },
    'ići': {
        aspect: 'n',
        pres: ['idem','ideš','ide','idemo','idete','idu'],
        past: ['išao', 'išla', 'išlo', 'išli', 'išle', 'išla'],
        gerund: ['idući'],
        imperative: ['idi', 'idite']
    },
}

export function makeGrammarTasks() : GrammarTask[] {
    return shuffle(VERB_TASKS_PRESENT).map(task => ({...task, form: VERB_FORMS[task.word].pres[task.form], suggestions: shuffle(VERB_FORMS[task.word].pres)}));
}