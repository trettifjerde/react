export function shuffle(words: string[]) {
    const newWords = [...words];
    for (let i = 0; i < newWords.length; i++) {
        const buffer = newWords[i];
        const j = Math.floor(Math.random() * newWords.length);
        newWords[i] = newWords[j];
        newWords[j] = buffer;
    }
    return newWords;
}

export function pickRandom(words: string[]) {
    return words[Math.floor(Math.random() * words.length)];
}

export const SUCCESS = ['Correct!', 'Right you are!', 'Splendid!', 'Good job!'];
export const FAIL = ['Oh, no!', 'Wrong!', 'Nope!'];