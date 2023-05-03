import { makeImperatives, makePastForms, makePresentForms } from "../util/grammar";
import { Verb, nounLabels as nl } from "./grammarTypes";

export const VERBS: {[key: string]: Verb} = {
    'biti': {
        aspect: 'n',
        subjects: [nl.any],
        objects: {
            [nl.object]: ['N', '']
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
        subjects: [nl.human],
        objects: {
            [nl.human]: ['I', 's'],
            [nl.any]: ['L', 'o']
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
        subjects: [nl.animal, nl.human],
        objects: {
            [nl.any]: ['A', '']
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
        subjects: [nl.animal, nl.human],
        objects: {
            [nl.human]:['A', ''],
            [nl.animal]: ['A', ''],
            [nl.any]: ['A', '']
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
        subjects: [nl.animal, nl.human],
        objects: {
            [nl.place]: ['L', 'u']
        },
        pres: makePresentForms('živiti'),
        past: makePastForms('živiti'),
        imperative: makeImperatives('živiti'),
        gerund: ['živeći'],
        extras: ['whereAt']
    },
    'slušati': {         
        aspect: 'n',
        subjects: [nl.animal, nl.human],
        objects: {
            [nl.human]:['A', ''],
            [nl.animal]: ['A', '']
        },
        pres: makePresentForms('slušati'),
        past: makePastForms('slušati'),
        imperative: makeImperatives('slušati'),
        gerund: ['slušajući'],
        extras: []
    },
    'jesti': {
        aspect: 'n',
        subjects: [nl.animal, nl.human],
        objects: {
            [nl.human]:['A', ''],
            [nl.food]: ['A', '']
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
        subjects: [nl.animal, nl.human],
        objects: {},
        pres: makePresentForms('spavati'),
        past: makePastForms('spavati'),
        gerund: ['spavajući'],
        imperative: makeImperatives('spavati'),
        extras: ['whereAt', 'whenPresent', 'whomWith']
    },
    'ići': {
        aspect: 'n',
        subjects: [nl.animal, nl.human, nl.vehicle],
        objects: {
            [nl.human]:['I', 's'],
            [nl.animal]: ['I', 's'],
            [nl.vehicle]: ['I', '']
        },
        pres: makePresentForms('ideti'),
        past: ['išao', 'išla', 'išlo', 'išli', 'išle', 'išla'],
        gerund: ['idući'],
        imperative: ['idi', 'idite'],
        extras: ['whereFrom', 'whereTo', 'whomWith']
    },
    'raditi': {
        aspect: 'n',
        subjects: [nl.human, nl.mechanism],
        objects: {
            [nl.human]:['I', 's']
        },
        pres: makePresentForms('raditi'),
        past: makePastForms('raditi'),
        gerund: ['radeći'],
        imperative: makeImperatives('raditi'),
        extras: ['whereAt', 'whenPresent', 'whomWith']
    },
    'znati': {
        aspect: 'n',
        subjects: [nl.animal, nl.human],
        objects: {
            [nl.any]: ['A', '']
        },
        pres: makePresentForms('znati'),
        past: makePastForms('znati'),
        gerund: ['znajući'],
        imperative: makeImperatives('znati'),
        extras: []
    },
    'misliti': {
        aspect: 'n',
        subjects: [nl.animal, nl.human],
        objects: {
            [nl.any]: ['L', 'o']
        },
        pres: makePresentForms('misliti'),
        past: makePastForms('misliti'),
        imperative: makeImperatives('misliti'),
        gerund: ['misleći'],
        extras: ['whatAbout']
    },
    'imati': {
        aspect: 'n',
        subjects: [nl.any],
        objects: {
            [nl.any]: ['A', '']
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
        subjects: [nl.any],
        objects: {
            [nl.human]:['D', ''],
            [nl.any]: ['I', 's']
        },
        pres: makePresentForms('pomogneti'),
        past: makePastForms('pomogti', true),
        imperative: ['pomozi', 'pomozite'],
        gerund: ['pomogavši'],
        extras: ['whomTo']
    },
    'pomagati': {
        aspect: 'n',
        subjects: [nl.any],
        objects: {
            [nl.human]:['D', ''],
            [nl.any]: ['I', 's']
        },
        pres: makePresentForms('pomažeti'),
        past: makePastForms('pomagati'),
        imperative: ['pomaži', 'pomažite'],
        gerund: ['pomažuči'],
        extras: ['whomTo']
    },
    'pitati': {
        aspect: 'n',
        subjects: [nl.human],
        objects: {
            [nl.human]:['A', ''],
            [nl.any]: ['L', 'o']
        },
        pres: makePresentForms('pitati'),
        past: makePastForms('pitati'),
        imperative: makeImperatives('pitati'),
        gerund: ['pitajući'],
        extras: []
    },
    'odgovoriti': {
        aspect: 's',
        subjects: [nl.human],
        objects: {
            [nl.human]:['D', '']
        },
        pres: makePresentForms('odgovoriti'),
        past: makePastForms('odgovoriti'),
        imperative: makeImperatives('odgovoriti'),
        gerund: ['odgovorivši'],
        extras: ['whomTo']
    }
}