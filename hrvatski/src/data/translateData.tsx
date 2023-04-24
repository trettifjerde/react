import { Language } from "../types";

type Label = 'basics' | 'common phrases' | 'questions' | 'negations';

type TranslationTask = {
    hrv: string,
    en: string,
    labels: Label[]
};
type TaskBlock = {
    name: string,
    path: string,
    tasks: TranslationTask[]
}

export function isValidBerlitzTask(path?: string) {
    return path && !isNaN(+path) && berlitz.length >= +path;
}

export function isValidBerlitzTaskParams(targetLang: Language, path?: string) {
    return isValidBerlitzTask(path) && (targetLang === 'hrv' || targetLang === 'en');
}

function makeSet(language: Language) {
    const dict = new Set<string>();
    berlitz.forEach(block => {
        block.tasks.map(pair => pair[language])
        .forEach(sentence => {
            sentence
                .split(' ')
                .forEach(word => dict.add(word))
        })
    });
    return Array.from(dict);
}
export const berlitz : TaskBlock[] = [
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
        tasks: [
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
        tasks: [
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
        ]
    }
];

export const hrvExtras : {[key: string] : string[]} = {
    'dobar dan': ['bok', 'pozdrav'], 
    'dobra večer': ['večer', 'veče', 'dobro veče', 'dobar večer'],
    'dobro jutro': ['jutro'], 
    'hvala': ['hvala puno', 'hvala lijepo', 'hvala lijepa', 'puno hvala'], 
    'hvala lijepo': ['hvala puno', 'puno hvala'],
    'nema na čemu': ['molim', 'ništa'],
    'samo trenutak': ['samo malo'], 
    'za danas je dosta': [], 
    'drago mi je': ['drago mi je vas upoznati'],
    'kako se kaže na engleskom': ['kako se to kaže na engleskom', 'kako se zove na engleskom', 'kako se to zove na engleskom'], 
    'vidimo se': ['čujemo se'],
    'doviđenja': ['bok', 'vidimo se', 'pozdrav'],
    'oprostite': ['ispričavam se', 'pardon', 'žao mi je'],
    'žao mi je': ['ispričavam se', 'oprostite'],
    'kako ste': ['kako si', 'kako si ti', 'kako ste vi'],
    'odakle ste vi': ['odakle ste', 'odakle si', 'odakle si ti', 'otkuda si ti', 'otkuda si', 'otkuda ste vi', 'otkuda ste'],
    'ti si u pravu': ['u pravu si', 'u pravu ste', 'vi ste u pravu'],
    'žuri mi se': ['žurim', 'žurim se'],
    'koliko je sati': ['koliko je sad sati'],
    'kako se zoveš': ['kako se zovete', 'kako se ti zoveš', 'kako se vi zovete'],
    'ja ne znam dobro hrvatski jezik': ['ne znam dobro hrvatski jezik', 'ja ne znam dobro hrvatski', 'ne znam dobro hrvatski', 'ne znam hrvatski dobro',
        'dobro ne znam hrvatski', 'dobro ne znam hrvatski jezik'],
    'ja sam prvi put u Hrvatskoj': ['u hrvatskoj sam prvi put', 'prvi put sam u hrvatskoj'],
    'ja znam malo hrvatski jezik': ['znam malo hrvatski jezik', 'znam malo hrvatski'],
    'ponovite molim': ['molim ponovite', 'molim ponovi', 'molim ponovite'],
    'recite još jedan put': ['reci još jedan put', 'recite to još jedan put', 'reci to još jedan put'],
    'ja nisam Rus': ['nisam rus'],
    'ja sam isto student': ['i ja sam student', 'isto sam student'],
    'ne znam točno': ['ja ne znam točno', 'točno ne znam', 'ja točno ne znam'],
    'sigurno': ['naravno', 'svakako'],
    'pokušaj još jednom': ['pokušajte još jednom', 'pokušaj još jedan put', 'pokušajte još jedan put'],
    'zapamtite to molim': ['zapamti to molim', 'molim zapamtite to', 'molim zapamti to'],
    'ova djevojka je učenica': ['ova djevojka je studentica', 'ova cura je učenica', 'ova cura je studentica'],
    'taj dečko je učenik': ['taj dječak je učenik', 'taj momak je učenik', 'taj momak je student', 'taj dječak je student', 'taj dečko je student'],
    'oni ne vole učiti engleski': ['oni ne vole učiti engleski jezik', 'ne vole učiti engleski', 'ne vole učiti engleski jezik', 'ne sviđa im se učiti engleski', 'ne sviđa im se učiti engleski jezik'],
    'on je veoma dobar student': ['on je vrlo dobar student', 'veoma je dobar student', 'vrlo je dobar student'],
    'volim učiti strane jezike': ['ja volim učiti strane jezike', 'sviđa mi se učiti strane jezike'],
    'možeš li reći slovo po slovo': ['možeš li to reći slovo po slovo'],
    'tako je': ['točno tako', 'to je točno', 'točno']
}

export const enExtras: {[key: string] : string[]} = {
    'goodbye': ['bye'],
    'good day': ['hi', 'hello', 'good afternoon'],
    'good evening': ['evening', 'hi', 'hello'],
    'good morning': ['morning', 'hi', 'hello'],
    'thank you': ['thanks'],
    'thank you very much': ['thanks a lot', 'thank you so much'],
    'you are welcome': ["you're welcome", 'no problem', 'my pleasure'],
    'just a second': ['just a moment', 'wait a bit', 'wait a moment'],
    'enough for today': ["that's enough for today", "it's enough for today"],
    'nice to meet you': ['my pleasure', 'it is nice to meet you', "it's nice to meet you", "i'm pleased"],
    'what is the English for': ["what's the english for", "what's it called in english", 
        "what is it called in english", "what's the english word for", 'what is the english word for',
        "how do you say it in english"
    ],
    'see you': ['see you later', "i'll see you later", "i will see you later"],
    'i am sorry': ["i'm sorry", "sorry", "excuse me"],
    'you are right': ['right you are', "you're right"],
    'i am in hurry': ["i'm in hurry"],
    'feel free to ask': ['just ask', 'ask freely'],
    'what is your name': ["what's your name"],
    "it is my first time in Croatia": ["it's my first time in croatia", "i am in croatia for the first time", "i'm in croatia for the first time"],
    'i know a bit Croatian': ['i know croatian a little', 'i know a little croatian', 'i speak a bit croatian'],
    'please repeat': ['repeat please'],
    'say one more time': ['say it one more time', 'say it once again', 'say it again'],
    'i am not Russian': ["i'm not russian"],
    'i am a student too': ["i'm a student too", "i'm a student as well", "i am a student as well", "i'm also a student", 'i am also a student'],
    'i do not know for sure': ["i don't know for sure", "i don't really know", 'i do not really know', "i don't know for certain", "i do not know for certain"],
    'of course': ['sure', 'certainly'],
    'try once more': ['try once again', 'try one more time'],
    'remember it please': ['please remember it'],
    'this girl is a student': ['this girl is a pupil'],
    'that boy is a student': ['that lad is a student', 'that lad is a pupil', 'that boy is a pupil'],
    'they do not like learning English': ["they don't like learning english", "they don't like learning english language", "they do not like learning english language"],
    'he is a very good student': ["he's a very good student"],
    'correct': ["that's right", "that's correct", 'that is correct', 'that is true', 'that is right', 'it is true']
}

export const croatian = makeSet('hrv');
export const english = makeSet('en');
export const taskPaths = berlitz.map(block => block.path);