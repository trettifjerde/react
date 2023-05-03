import { makeImperatives, makeNounForms, makePastForms, makePresentForms } from "../util/grammar";
import {Noun, NounLabel, Verb} from "./grammarTypes";

export const VERBS: {[key: string]: Verb} = {
    'biti': {
        aspect: 'n',
        subjects: ['any'],
        objects: {
            any: ['N', '']
        },
        pres: ['sam','si','je','smo','ste','su'],
        neg: ['nisam', 'nisi', 'nije', 'nismo', 'niste', 'nisu'],
        past: ['bio', 'bila', 'bilo', 'bili', 'bile', 'bila'],
        gerund: ['budući'],
        imperative: ['budi', 'budite'],
        extras: ['whereFrom', 'whereAt']
    },
    'govoriti': {
        aspect: 'n',
        subjects: ['people'],
        objects: {
            people: ['I', 's'],
            any: ['L', 'o']
        },
        pres: makePresentForms('govoriti'),
        past: makePastForms('govoriti'),
        passive: ['govoren'],
        gerund: ['govoreći'],
        imperative: makeImperatives('govoriti'),
        extras: ['whatAbout', 'whereAt']
    },
    'voljeti': {
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {
            any: ['A', '']
        },
        pres: makePresentForms('voliti'),
        past: ['volio', ...makePastForms('voljeti').slice(1)],
        gerund: ['voleći'],
        passive: ['voljen'],
        imperative: makeImperatives('voliti'),
        extras: []
    },
    'učiti': {
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {
            people: ['A', ''],
            animals: ['A', ''],
            any: ['A', '']
        },
        pres: makePresentForms('učiti'),
        past: makePastForms('učiti'),
        imperative: makeImperatives('učiti'),
        gerund: ['učeći'],
        passive: ['učen'],
        extras: []
    },
    'živjeti': {
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {
            places: ['L', 'u']
        },
        pres: makePresentForms('živiti'),
        past: makePastForms('živiti'),
        imperative: makeImperatives('živiti'),
        gerund: ['živeći'],
        extras: ['whereAt']
    },
    'slušati': {         
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {
            people: ['A', ''],
            animals: ['A', '']
        },
        pres: makePresentForms('slušati'),
        past: makePastForms('slušati'),
        imperative: makeImperatives('slušati'),
        gerund: ['slušajući'],
        extras: []
    },
    'jesti': {
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {
            people: ['A', ''],
            food: ['A', '']
        },
        pres: ['jedem','jedeš','jede','jedemo','jedete','jedu'],
        past: makePastForms('jeti'),
        passive: ['jeden'],
        gerund: ['jedući'],
        imperative: ['jedi', 'jedite'],
        extras: ['whenPresent', 'whomWith']
    },
    'spavati': {
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {},
        pres: makePresentForms('spavati'),
        past: makePastForms('spavati'),
        gerund: ['spavajući'],
        imperative: makeImperatives('spavati'),
        extras: ['whereAt', 'whenPresent', 'whomWith']
    },
    'ići': {
        aspect: 'n',
        subjects: ['animals', 'people', 'vehicle'],
        objects: {
            people: ['I', 's'],
            animals: ['I', 's'],
            vehicle: ['I', '']
        },
        pres: makePresentForms('ideti'),
        past: ['išao', 'išla', 'išlo', 'išli', 'išle', 'išla'],
        gerund: ['idući'],
        imperative: ['idi', 'idite'],
        extras: ['whereFrom', 'whereTo', 'whomWith']
    },
    'raditi': {
        aspect: 'n',
        subjects: ['people', 'mechanism'],
        objects: {
            people: ['I', 's']
        },
        pres: makePresentForms('raditi'),
        past: makePastForms('raditi'),
        gerund: ['radeći'],
        imperative: makeImperatives('raditi'),
        extras: ['whereAt', 'whenPresent', 'whomWith']
    },
    'znati': {
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {
            any: ['A', '']
        },
        pres: makePresentForms('znati'),
        past: makePastForms('znati'),
        gerund: ['znajući'],
        imperative: makeImperatives('znati'),
        extras: []
    },
    'misliti': {
        aspect: 'n',
        subjects: ['animals', 'people'],
        objects: {
            any: ['L', 'o']
        },
        pres: makePresentForms('misliti'),
        past: makePastForms('misliti'),
        imperative: makeImperatives('misliti'),
        gerund: ['misleći'],
        extras: ['whatAbout']
    },
    'imati': {
        aspect: 'n',
        subjects: ['any'],
        objects: {
            any: ['A', '']
        },
        pres: makePresentForms('imati'),
        past: makePastForms('imati'),
        imperative: makeImperatives('imati'),
        neg: ['nemam', 'nemaš', 'nema', 'nemamo', 'nemate', 'nemaju'],
        gerund: ['imajući'],
        extras: []
    },
    'pomoći': {
        aspect: 's',
        subjects: ['any'],
        objects: {
            people: ['D', ''],
            any: ['I', 's']
        },
        pres: makePresentForms('pomogneti'),
        past: makePastForms('pomogti', true),
        imperative: ['pomozi', 'pomozite'],
        gerund: ['pomogavši'],
        extras: ['whomTo']
    },
    'pomagati': {
        aspect: 'n',
        subjects: ['any'],
        objects: {
            people: ['D', ''],
            any: ['I', 's']
        },
        pres: makePresentForms('pomažeti'),
        past: makePastForms('pomagati'),
        imperative: ['pomaži', 'pomažite'],
        gerund: ['pomažuči'],
        extras: ['whomTo']
    },
    'pitati': {
        aspect: 'n',
        subjects: ['people'],
        objects: {
            people: ['A', ''],
            any: ['L', 'o']
        },
        pres: makePresentForms('pitati'),
        past: makePastForms('pitati'),
        imperative: makeImperatives('pitati'),
        gerund: ['pitajući'],
        extras: []
    },
    'odgovoriti': {
        aspect: 's',
        subjects: ['people'],
        objects: {
            people: ['D', '']
        },
        pres: makePresentForms('odgovoriti'),
        past: makePastForms('odgovoriti'),
        imperative: makeImperatives('odgovoriti'),
        gerund: ['odgovorivši'],
        extras: ['whomTo']
    }
}

export const NOUNS: {[key: string]: Noun} = {
    'dječak': {
        gender: 'm',
        animate: true,
        forms: makeNounForms('dječak', 'm', true),
        labels: ['people']
    },
    'student': {
        gender: 'm',
        animate: true,
        forms: makeNounForms('student', 'm', true),
        labels: ['people']
    },
    'učenik': {
        gender: 'm',
        animate: true,
        forms: makeNounForms('učenik', 'm', true),
        labels: ['people']
    },
    'jezik': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('jezik', 'm'),
        labels: []
    },
    'slovo': {
        gender: 'n',
        animate: false,
        forms: makeNounForms('slovo', 'n'),
        labels: []
    },
    'riječ': {
        gender: 'f',
        animate: false,
        forms: makeNounForms('riječ', 'f'),
        labels: []
    },
    'Zagreb': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('Zagreb', 'm'),
        labels: ['places']
    },
    'Zadar': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('Zadar', 'm'),
        labels: ['places']
    },
    'Split': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('Split', 'm'),
        labels: ['places']
    }
};

export const LABELED_NOUNS: {[key: string]: string[]} = {};

['animals', 'food', 'people', 'occupation', 'vehicle', 'mechanism', 'places'].forEach(label => {
    LABELED_NOUNS[label] = filterByLabel(label as NounLabel);
})

export const extrasDict = {
    whereAt: ['u školi', 'u dućanu', 'na poslu', 'vani', 'kod kuće', 'u kafiću', 'u gradu'],
    whereFrom: ['iz Zadra', 'iz Zagreba', 'iz Splita', 'iz Hrvatske', 'iz Rusije'],
    whatAbout: ['o poslu', 'o moru', 'o životu', 'o vremenu', 'o jeziku', 'o tebi', 'o nama'],
    whomWith: ['s prijateljem', 's majkom', 's Kesakom', 's mačkom', 'sa psom'],
    whereTo: ['na posao', 'u školu', 'kući', 'u grad', 'u kafić'],
    whomTo: ['prijatelju', 'meni', 'tebi', 'nama', 'mački', 'curi', 'momku', 'majci', 'prijateljici'],
    whenPresent: ['ujutro', 'navečer', 'po podne', 'poslije podne', 'noću']
}

export const grammarTaskPaths = [
    {path: 'biti', name: '"biti"'},
    {path: 'random', name: 'One random verb'},
    {path: 'prezent', name: 'Random verbs'}
]

function filterByLabel(l: NounLabel) {
    return Object.entries(NOUNS).filter(([noun, info]) => info.labels.includes(l)).map(([noun, info]) => (noun));
}
