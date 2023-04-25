import { CommonTask } from "../types";

export function shuffle<T>(words: T[]) {
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
    return words[pickRandomIndex(words.length)];
}

export function pickRandomIndex(maxLength: number) {
    return Math.floor(Math.random() * maxLength);
}

export function makeAnswerString<T extends CommonTask>(task: T) {
    return `${task.source} = ${task.target}`
}

export const SUCCESS = ['Correct!', 'Right you are!', 'Splendid!', 'Good job!', 'Fantastic!', 'Odlično!', 'Tako je!', 'Točno!', 'Upravo tako!'];
export const FAIL = ['Oh, no!', 'Wrong!', 'Nije baš tako!', 'Nope!', 'Joj, pazi!', 'Oops!', 'Ajme meni!'];