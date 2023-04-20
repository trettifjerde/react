import { Language } from "../types";

function makeSet(language: Language) {
    const dict = new Set<string>();
    sentences
        .map(pair => pair[language])
        .forEach(sentence => {
            sentence
                .split(' ')
                .forEach(word => dict.add(word))
        });
    return Array.from(dict);
}
export const sentences : Array<{hrv: string, en: string}> = [
    {hrv: 'dobar dan', en: 'good day'},
    {hrv: 'dobra večer', en: 'good evening'},
    {hrv: 'dobro jutro', en: 'good morning'},
    {hrv: 'hvala', en: 'thank you'},
    {hrv: 'nema na čemu', en: 'you are welcome'},
    {hrv: 'samo trenutak', en: 'just a second'},
    {hrv: 'za danas je dosta', en: 'enough for today'},
    {hrv: 'drago mi je', en: 'nice to meet you'},
    {hrv: 'kako se kaže na engleskom', en: 'what is the English for'},
    {hrv: 'vidimo se', en: 'see you'}
]

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
    'vidimo se': ['čujemo se'] 
}

export const enExtras: {[key: string] : string[]} = {
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
    'see you': ['see you later', "i'll see you later", "i will see you later"]

}

export const croatian = makeSet('hrv');
export const english = makeSet('en');