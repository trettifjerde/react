import { Language } from "../types";

type TranslationTask = {
    hrv: string,
    en: string
};
type TaskBlock = {
    name: string,
    path: string,
    tasks: TranslationTask[]
}

function makeSet(language: Language) {
    const dict = new Set<string>();
    sentences.forEach(block => {
        block.tasks.map(pair => pair[language])
        .forEach(sentence => {
            sentence
                .split(' ')
                .forEach(word => dict.add(word))
        })
    });
    return Array.from(dict);
}
export const sentences : TaskBlock[] = [
    {
        name: 'Basics',
        path: 'basics',
        tasks: [
            {hrv: 'dobar dan', en: 'good day'},
            {hrv: 'dobra večer', en: 'good evening'},
            {hrv: 'dobro jutro', en: 'good morning'},
            {hrv: 'hvala', en: 'thank you'},
            {hrv: 'nema na čemu', en: 'you are welcome'},
            {hrv: 'drago mi je', en: 'nice to meet you'},
            {hrv: 'vidimo se', en: 'see you'},
            {hrv: 'doviđenja', en: 'goodbye'},
            {hrv: 'oprostite', en: "I am sorry"}
        ],
    },
    {
        name: 'Common phrases',
        path: 'commonphrases',
        tasks: [
            {hrv: 'samo trenutak', en: 'just a second'},
            {hrv: 'za danas je dosta', en: 'enough for today'},
            {hrv: 'kako se kaže na engleskom', en: 'what is the English for'},
            {hrv: 'ti si u pravu', en: 'you are right'},
            {hrv: 'žuri mi se', en: 'I am in hurry'},
            {hrv: 'žao mi je', en: 'I am sorry'},
            {hrv: 'slobodno pitaj', en: 'feel free to ask'}
        ]
    },
    {
        name: 'Everyday questions',
        path: 'equestions',
        tasks: [
            {hrv: 'kako ste', en: 'how are you'},
            {hrv: 'odakle ste vi', en: 'where are you from' },
            {hrv: 'što to znači', en: 'what does it mean'},
            {hrv: 'koliko je sati', en: 'what time is it'},
            {hrv: 'kako se zoveš', en: 'what is your name'}
        ]
    }
];

export const hrvExtras : {[key: string] : string[]} = {
    'dobar dan': ['bok', 'pozdrav'], 
    'dobra večer': ['večer', 'veče', 'dobro veče', 'dobar večer'],
    'dobro jutro': ['jutro'], 
    'hvala': ['hvala puno', 'hvala lijepo', 'hvala lijepa', 'puno hvala'], 
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
    'kako se zoveš': ['kako se zovete', 'kako se ti zoveš', 'kako se vi zovete']
}

export const enExtras: {[key: string] : string[]} = {
    'goodbye': ['bye'],
    'good day': ['hi', 'hello', 'good afternoon'],
    'good evening': ['evening', 'hi', 'hello'],
    'good morning': ['morning', 'hi', 'hello'],
    'thank you': ['thanks'],
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
    'what is your name': ["what's your name"]
}

export const croatian = makeSet('hrv');
export const english = makeSet('en');
export const taskPaths = sentences.map(block => block.path);