import { GrammarTask } from "../types";
import { pickRandom, pickRandomIndex, shuffle } from "../util/common";


type VerbAspect = 'n' | 's';
type VerbGroup = 'i' | 'e' | 'a';
type VerbForm = 'present' | 'imperative';
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
        imperative: string[],
        extras: Extras[]
    };
};
export type GrammarTaskDict = VerbTaskPresent;

type Adverbials = 'whereAt' | 'whereFrom' | 'whatAbout' | 'whomWith' | 'whereTo' | 'whenPresent' | 'whomTo' | 'whom';
type Objects = 'food' | 'people' | 'occupation';
type Extras = Adverbials | Objects;

function getForm(verb: string, form: VerbForm = 'present') {
    const stem = verb.slice(0, -3);
    const group = verb.slice(-3, -2) as VerbGroup;
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
    return stem + e;
}
function makePresentForms(verb: string) {
    const stem = verb.slice(0, -2);
    const forms = ['m', 'š', '', 'mo', 'te'].map(e => stem + e);
    forms.push(getForm(verb));
    return forms;
}

function makePastForms(verb: string, extraA=false) {
    const stem = verb.slice(0, -2);
    return [extraA? 'ao' : 'o', 'la', 'lo', 'li', 'le', 'la'].map(e => stem + e);
}

function makeImperatives(verb: string) {
    const form = getForm(verb, 'imperative');
    return [form, form + 'te'];
}

export const VERB_FORMS: FormsDict = {
    'biti': {
        aspect: 'n',
        pres: ['sam','si','je','smo','ste','su'],
        past: ['bio', 'bila', 'bilo', 'bili', 'bile', 'bila'],
        gerund: ['budući'],
        imperative: ['budi', 'budite'],
        extras: ['whereFrom', 'whereAt', 'whomWith']
    },
    'govoriti': {
        aspect: 'n',
        pres: makePresentForms('govoriti'),
        past: makePastForms('govoriti'),
        passive: ['govoren'],
        gerund: ['govoreći'],
        imperative: makeImperatives('govoriti'),
        extras: ['whatAbout', 'whomWith', 'whereAt']
    },
    'jesti': {
        aspect: 'n',
        pres: ['jedem','jedeš','jede','jedemo','jedete','jedu'],
        past: makePastForms('jeti'),
        passive: ['jeden'],
        gerund: ['jedući'],
        imperative: ['jedi', 'jedite'],
        extras: ['food', 'people', 'whenPresent', 'whomWith']
    },
    'spavati': {
        aspect: 'n',
        pres: makePresentForms('spavati'),
        past: makePastForms('spavati'),
        gerund: ['spavajući'],
        imperative: makeImperatives('spavati'),
        extras: ['whereAt', 'whenPresent', 'whomWith']
    },
    'ići': {
        aspect: 'n',
        pres: makePresentForms('ideti'),
        past: ['išao', 'išla', 'išlo', 'išli', 'išle', 'išla'],
        gerund: ['idući'],
        imperative: ['idi', 'idite'],
        extras: ['whereFrom', 'whereTo', 'whomWith']
    },
    'raditi': {
        aspect: 'n',
        pres: makePresentForms('raditi'),
        past: makePastForms('raditi'),
        gerund: ['radeći'],
        imperative: makeImperatives('raditi'),
        extras: ['whereAt', 'whenPresent', 'whomWith']
    },
    'znati': {
        aspect: 'n',
        pres: makePresentForms('znati'),
        past: makePastForms('znati'),
        gerund: ['znajući'],
        imperative: makeImperatives('znati'),
        extras: ['people']
    },
    'misliti': {
        aspect: 'n',
        pres: makePresentForms('misliti'),
        past: makePastForms('misliti'),
        imperative: makeImperatives('misliti'),
        gerund: ['misleći'],
        extras: ['whatAbout']
    },
    'imati': {
        aspect: 'n',
        pres: makePresentForms('imati'),
        past: makePastForms('imati'),
        imperative: makeImperatives('imati'),
        gerund: ['imajući'],
        extras: ['food', 'people']
    },
    'pomoći': {
        aspect: 's',
        pres: makePresentForms('pomogneti'),
        past: makePastForms('pomogti', true),
        imperative: ['pomozi', 'pomozite'],
        gerund: ['pomogavši'],
        extras: ['whomTo']
    },
    'pomagati': {
        aspect: 'n',
        pres: makePresentForms('pomažeti'),
        past: makePastForms('pomagati'),
        imperative: ['pomaži', 'pomažite'],
        gerund: ['pomažuči'],
        extras: ['whomTo']
    },
    'pitati': {
        aspect: 'n',
        pres: makePresentForms('pitati'),
        past: makePastForms('pitati'),
        imperative: makeImperatives('pitati'),
        gerund: ['pitajući'],
        extras: ['whom']
    },
    'odgovoriti': {
        aspect: 's',
        pres: makePresentForms('odgovoriti'),
        past: makePastForms('odgovoriti'),
        imperative: makeImperatives('odgovoriti'),
        gerund: ['odgovorivši'],
        extras: ['whomTo']
    }
}

type Pronouns = 'ja' | 'ti' | 'on' | 'ona' | 'oni' | 'ono' | 'one' | 'mi' | 'vi';

const getSubjectFormVerbFormIndex : (index: number) => Pronouns = (index) => {
    switch(index) {
        case 0:
            return 'ja';
        case 1:
            return 'ti';
        case 2:
            return pickRandom(['on', 'ona', 'ono']) as Pronouns
        case 3: 
            return 'mi'
        case 4: 
            return 'vi'
        default: 
            return pickRandom(['oni', 'one']) as Pronouns
    }
}

function makeOneVerbTasks(verb: string) : GrammarTask[]{
    const forms = VERB_FORMS[verb].pres;
    const tasks: GrammarTask[] = [];
    const endings = VERB_FORMS[verb].extras.reduce((acc, v) => {
        acc.push(...extrasDict[v])
        return acc;
    }, [] as string[]);

    for (let i = 0; i < 11; i++) {
        const j = pickRandomIndex(forms.length);
        tasks.push({
            start: pickRandom(subjects[getSubjectFormVerbFormIndex(j)]),
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
    const nVerbs = Object.entries(VERB_FORMS).filter(([verb, info]) => info.aspect === 'n').map(([verb, info]) => verb);
    console.log(nVerbs);

    for (let i = 0; i < 11; i++) {
        const verb = pickRandom(nVerbs);
        const forms = VERB_FORMS[verb].pres;
        if (!(verb in endings)) {
            const opts = VERB_FORMS[verb].extras.reduce((acc, v) => {
                acc.push(...extrasDict[v])
                return acc;
            }, [] as string[]);
            endings[verb] = opts;
        }
        const ends = endings[verb];
        const j = pickRandomIndex(forms.length);
        tasks.push({
            start: pickRandom(subjects[getSubjectFormVerbFormIndex(j)]),
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
            return makeOneVerbTasks(pickRandom(Object.keys(VERB_FORMS)))
    }
}

const subjects = {
    ja: ['ja'],
    ti: ['ti'],
    vi: ['vi'],
    mi: ['mi', 'ja i Kisik', 'ja i Muhsik'],
    oni: ['prijateli', 'studenti', 'momci', 'psi', 'radnici', 'učenici', 'radnici', 'Kesak i Muhsik'],
    one: ['prijateljice', 'djevojke', 'učenice', 'studentice', 'radnice', 'miske'],
    on: ['pas', 'prijatelj', 'Kesak', 'student', 'Hrvat', 'Rus', 'radnik', 'učenik', 'momak'],
    ona: ['Miska', 'prijateljica', 'cura', 'djevojka', 'studentica', 'radnice', 'Muhsik', 'Hrvatica', 'Ruskinja'],
    ono: ['dijete']
};

const extrasDict = {
    whereAt: ['u školi', 'u dućanu', 'na poslu', 'vani', 'kod kuće', 'u kafiću', 'u gradu'],
    whereFrom: ['iz Zadra', 'iz Zagreba', 'iz Splita', 'iz Hrvatske', 'iz Rusije'],
    whatAbout: ['o poslu', 'o moru', 'o životu', 'o vremenu', 'o jeziku', 'o tebi', 'o nama'],
    whomWith: ['s prijateljem', 's majkom', 's Kesakom', 's mačkom', 'sa psom'],
    whereTo: ['na posao', 'u školu', 'kući', 'u grad', 'u kafić'],
    whomTo: ['prijatelju', 'meni', 'tebi', 'nama', 'mački', 'curi', 'momku', 'majci', 'prijateljici'],
    food: ['jabuku', 'juhu', 'krušku', 'meso', 'ribu', 'hrvatska jela'],
    people: ['prijatelja', 'Kesaka', 'misku', 'dijete'],
    whenPresent: ['ujutro', 'navečer', 'po podne', 'poslije podne', 'noću'],
    occupation: ['nastava', 'sastanak', 'tečaj hrvatskog jezika', 'doručak'],
    whom: []
}

export const grammarTaskPaths = [
    {path: 'biti', name: '"biti"'},
    {path: 'random', name: 'One random verb'},
    {path: 'prezent', name: 'Random verbs'}
]