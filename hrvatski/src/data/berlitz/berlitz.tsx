import { Language, TaskLevel } from "../../types";

function makeSet(language: Language) {
    const dict = new Set<string>();
    berlitz.forEach(block => {
        block.sentences.map(pair => pair[language])
        .forEach(sentence => {
            sentence
                .split(' ')
                .forEach(word => dict.add(word))
        })
    });
    return Array.from(dict);
};

export const berlitz : TaskLevel[] = [
/*
        name: 'Common phrases',
        path: 'commonphrases',
        tasks: [
            {hrv: 'samo trenutak', en: 'just a second'},
            {hrv: 'žao mi je', en: 'I am sorry'},
            {hrv: 'slobodno pitaj', en: 'feel free to ask'}
        ]
    },
    {
        name: 'Everyday questions',
        path: 'equestions',
        tasks: [
            {hrv: 'koliko je sati', en: 'what time is it'},
        ]
    },*/
    {
        name: '1. lekcija',
        path: '1',
        tasks: ['blocks', 'write'],
        vocabulary: {},
        sentences: [
            {hrv: 'dobar dan', en: 'good day', labels: ['basics']},
            {hrv: 'dobra večer', en: 'good evening', labels: ['basics']},
            {hrv: 'dobro jutro', en: 'good morning', labels: ['basics']},
            {hrv: 'nema na čemu', en: 'you are welcome', labels: ['basics']},
            {hrv: 'ja ne znam dobro hrvatski jezik', en: 'I do not know Croatian well', labels: ['common phrases']},
            {hrv: 'kako se zoveš', en: 'what is your name', labels: ['questions']},
            {hrv: 'ja sam prvi put u Hrvatskoj', en: "it is my first time in Croatia", labels: ['common phrases']},
            {hrv: 'ja znam malo hrvatski jezik', en: 'I know a bit Croatian', labels: ['common phrases']},
            {hrv: 'ponovite molim', en: 'please repeat', labels: ['common phrases']},
            {hrv: 'recite još jedan put', en: 'say one more time', labels: ['common phrases']},
            {hrv: 'drago mi je', en: 'nice to meet you', labels: ['basics']},
            {hrv: 'i meni je drago', en: 'nice to meet you too', labels: ['basics']},
            {hrv: 'malo govorim francuski', en: 'I speak a bit French', labels: ['common phrases']},
            {hrv: 'ja nisam Rus', en: 'I am not Russian', labels: ['common phrases', 'negations']},
            {hrv: 'za danas je dosta', en: 'enough for today', labels: ['common phrases']},
            {hrv: 'dobro znam engleski', en: 'I know English well', labels: ['common phrases']},
            {hrv: 'hvala lijepo', en: 'thank you very much', labels: ['basics']},
            {hrv: 'odakle ste vi', en: 'where are you from', labels: ['questions'] },
            {hrv: 'doviđenja', en: 'goodbye', labels: ['basics']},
            {hrv: 'oprostite', en: "I am sorry", labels: ['basics']}
        ]
    },
    {
        name: '2. lekcija',
        path: '2',
        tasks: ['blocks', 'write', 'negations'],
        sentences: [
            {hrv: 'što to znači', en: 'what does it mean', labels: ['questions']},
            {hrv: 'kako se kaže na engleskom', en: 'what is the English for', labels: ['questions', 'common phrases']},
            {hrv: 'kako ste', en: 'how are you', labels: ['questions']},
            {hrv: 'ja sam isto student', en: 'I am student too', labels: []},
            {hrv: 'ne znam točno', en: 'I do not know for sure', labels: ['negations']},
            {hrv: 'možeš li reći slovo po slovo', en: 'can you spell it', labels: ['questions']},
            {hrv: 'sigurno', en: 'of course', labels: ['common phrases']},
            {hrv: 'nažalost', en: 'unfortunately', labels: ['common phrases']},
            {hrv: 'tako je', en: 'correct', labels: ['common phrases']},
            {hrv: 'pokušaj još jednom', en: 'try once more', labels: ['common phrases']},
            {hrv: 'zapamtite to molim', en: 'remember it please', labels: ['common phrases']},
            {hrv: 'ova djevojka je učenica', en: 'this girl is a student', labels: []},
            {hrv: 'taj dečko je učenik', en: 'that boy is a student', labels: []},
            {hrv: 'oni ne vole učiti engleski', en: 'they do not like learning English', labels: []},
            {hrv: 'on je veoma dobar student', en: 'he is a very good student', labels: []},
            {hrv: 'volim učiti strane jezike', en: 'I like learning foreign languages', labels: []},
            {hrv: 'žuri mi se', en: 'I am in hurry', labels: ['common phrases']},
            {hrv: 'ti si u pravu', en: 'you are right', labels: ['common phrases']},
        ],
        vocabulary: {
            verbs: ['značiti', 'voljeti', 'biti', 'imati', 'učiti', 'govoriti', 'živjeti', 'znati', 'slušati'],
            nouns: ['dječak', 'student', 'učenik', 'jezik', 'slovo', 'riječ']
        }
    }
];

export const croatian = makeSet('hrv');
export const english = makeSet('en');