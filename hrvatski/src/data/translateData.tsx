type Language = 'hrv' | 'en';

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

function shuffleWords(words: string[]) {
    const newWords = [...words];
    for (let i = 0; i < newWords.length; i++) {
        const buffer = newWords[i];
        const j = Math.floor(Math.random() * newWords.length);
        newWords[i] = newWords[j];
        newWords[j] = buffer;
    }
    return newWords;
}

export function pickRandomWords(i: number, lang: Language = 'en', n = 4) {
    const words = [...sentences[i][lang].split(' ')];
    const languageSet = lang === 'en' ? english : croatian;
    
    for (let i = 0; i < n; i++) {
        const j = Math.floor(Math.random() * languageSet.length);
        words.push(languageSet[j]);
    }
    return shuffleWords(words);
}

export const sentences : Array<{hrv: string, en: string}> = [
    {hrv: 'dobar dan', en: 'good day'},
    {hrv: 'dobra večer', en: 'good evening'},
    {hrv: 'dobro jutro', en: 'good morning'},
    {hrv: 'hvala', en: 'thank you'},
    {hrv: 'nema na čemu', en: 'you are welcome'}
];

export const croatian = makeSet('hrv');
export const english = makeSet('en');