import { GrammarTask } from "../types";
import { pickRandom, pickRandomIndex, shuffle } from "../util/common";


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
        imperative: string[],
        extras: Extras[]
    };
};
export type GrammarTaskDict = VerbTaskPresent;

type Adverbials = 'whereAt' | 'whereFrom' | 'whatAbout' | 'whomWith' | 'whereTo' | 'whenPresent';
type Objects = 'food' | 'people';
type Extras = Adverbials | Objects;

export const VERB_FORMS: FormsDict = {
    'biti': {
        aspect: 'n',
        pres: ['sam','si','je','smo','ste','su'],
        past: ['bio', 'bila', 'bilo', 'bili', 'bile', 'bila'],
        gerund: ['budući'],
        imperative: ['budi', 'budite'],
        extras: ['whereFrom', 'whereAt']
    },
    'govoriti': {
        aspect: 'n',
        pres: ['govorim','govoriš','govori','govorimo','govorite','govore'],
        past: ['govorio', 'govorila', 'govorilo', 'govorili', 'govorile', 'govorila'],
        passive: ['govoren'],
        gerund: ['govoreći'],
        imperative: ['govori', 'govorite'],
        extras: ['whatAbout', 'whomWith', 'whereAt']
    },
    'jesti': {
        aspect: 'n',
        pres: ['jedem','jedeš','jede','jedemo','jedete','jedu'],
        past: ['jeo', 'jela', 'jelo', 'jeli', 'jele', 'jela'],
        passive: ['jeden'],
        gerund: ['jedući'],
        imperative: ['jedi', 'jedite'],
        extras: ['food', 'people', 'whenPresent']
    },
    'spavati': {
        aspect: 'n',
        pres: ['spavam','spavaš','spava','spavamo','spavate','spavaju'],
        past: ['spavao', 'spavala', 'spavalo', 'spavali', 'spavale', 'spavala'],
        gerund: ['spavajući'],
        imperative: ['spavaj', 'spavajte'],
        extras: ['whereAt', 'whenPresent']
    },
    'ići': {
        aspect: 'n',
        pres: ['idem','ideš','ide','idemo','idete','idu'],
        past: ['išao', 'išla', 'išlo', 'išli', 'išle', 'išla'],
        gerund: ['idući'],
        imperative: ['idi', 'idite'],
        extras: ['whereFrom', 'whereTo']
    },
    'raditi': {
        aspect: 'n',
        pres: ['radim','radiš','radi','radimo','radite','rade'],
        past: ['radio', 'radila', 'radilo', 'radili', 'radile', 'radila'],
        gerund: ['radeći'],
        imperative: ['radi', 'radite'],
        extras: ['whereAt', 'whenPresent']
    },
    'znati': {
        aspect: 'n',
        pres: ['znam','znaš','zna','znamo','znate','znaju'],
        past: ['znao', 'znala', 'znalo', 'znali', 'znale', 'znala'],
        gerund: ['znajući'],
        imperative: ['znaj', 'znajte'],
        extras: ['people']
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

    for (let i = 0; i < 11; i++) {
        const verb = pickRandom(Object.keys(VERB_FORMS));
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
    whereAt: ['u školi', 'u dućanu', 'na poslu', 'vani', 'kod kuće', 'u kafiću'],
    whereFrom: ['iz Zadra', 'iz Zagreba', 'iz Splita', 'iz Hrvatske', 'iz Rusije'],
    whatAbout: ['o poslu', 'o moru', 'o životu', 'o vremenu', 'o jeziku'],
    whomWith: ['s prijateljem', 's majkom', 's Kesakom', 's mačkom', 'sa psom'],
    whereTo: ['na posao', 'u školu', 'kući', 'u grad', 'u kafić'],
    food: ['jabuku', 'juhu', 'krušku', 'meso', 'ribu', 'hrvatska jela'],
    people: ['prijatelja', 'Kesaka', 'misku', 'dijete'],
    whenPresent: ['ujutro', 'navečer', 'po podne', 'poslije podne', 'noću']
}