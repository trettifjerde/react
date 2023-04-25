import { pickRandom } from "../util/common";
import { makeImperatives, makePastForms, makePresentForms } from "../util/grammar";
import {Verb} from "./grammarTypes";

export const VERBS: {[key: string]: Verb} = {
    'biti': {
        aspect: 'n',
        pres: ['sam','si','je','smo','ste','su'],
        neg: ['nisam', 'nisi', 'nije', 'nismo', 'niste', 'nisu'],
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
    'voljeti': {
        aspect: 'n',
        pres: makePresentForms('voliti'),
        past: ['volio', ...makePastForms('voljeti').slice(1)],
        gerund: ['voleći'],
        passive: ['voljen'],
        imperative: makeImperatives('voliti'),
        extras: ['people', 'occupation', 'food']
    },
    'učiti': {
        aspect: 'n',
        pres: makePresentForms('učiti'),
        past: makePastForms('učiti'),
        imperative: makeImperatives('učiti'),
        gerund: ['učeći'],
        passive: ['učen'],
        extras: []
    },
    'živjeti': {
        aspect: 'n',
        pres: makePresentForms('živiti'),
        past: makePastForms('živiti'),
        imperative: makeImperatives('živiti'),
        gerund: ['živeći'],
        extras: ['whereAt']
    },
    'slušati': {         
        aspect: 'n',
        pres: makePresentForms('slušati'),
        past: makePastForms('slušati'),
        imperative: makeImperatives('slušati'),
        gerund: ['slušajući'],
        extras: ['people', 'occupation']
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
        neg: ['nemam', 'nemaš', 'nema', 'nemamo', 'nemate', 'nemaju'],
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

export const subjects = {
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

export const extrasDict = {
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
