import { makeNounForms } from "../util/grammar";
import { Noun, nounLabels as nl} from "./grammarTypes";

export const NOUNS: {[key: string]: Noun} = {
    'dječak': {
        gender: 'm',
        animate: true,
        forms: makeNounForms('dječak', 'm', true),
        labels: [nl.human, nl.object]
    },
    'student': {
        gender: 'm',
        animate: true,
        forms: makeNounForms('student', 'm', true),
        labels: [nl.human, nl.object]
    },
    'učenik': {
        gender: 'm',
        animate: true,
        forms: makeNounForms('učenik', 'm', true),
        labels: [nl.human, nl.object]
    },
    'jezik': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('jezik', 'm'),
        labels: [nl.object]
    },
    'slovo': {
        gender: 'n',
        animate: false,
        forms: makeNounForms('slovo', 'n'),
        labels: [nl.object]
    },
    'riječ': {
        gender: 'f',
        animate: false,
        forms: makeNounForms('riječ', 'f'),
        labels: [nl.object]
    },
    'Zagreb': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('Zagreb', 'm'),
        labels: [nl.place]
    },
    'Zadar': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('Zadar', 'm'),
        labels: [nl.place]
    },
    'Split': {
        gender: 'm',
        animate: false,
        forms: makeNounForms('Split', 'm'),
        labels: [nl.place]
    }
};

export const LABELED_NOUNS = Object.values(nl).reduce((acc, label) => {
    acc[label] = [];
    return acc;
}, {} as {[key: symbol]: string[]});

LABELED_NOUNS[nl.any] = Object.keys(NOUNS);

for (const noun in NOUNS) {
    NOUNS[noun].labels.forEach(label => {
        LABELED_NOUNS[label].push(noun);
    })
}