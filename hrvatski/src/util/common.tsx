import { enExtras, hrvExtras, sentences } from "../data/translateData";
import { Language, CommonTask, TranslationTask } from "../types";

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

export function makeTasks(targetLang: Language, maxQ: number) {
    const sourceLang = targetLang === 'hrv' ? 'en' : 'hrv';
    const extras = targetLang === 'hrv' ? hrvExtras : enExtras;
    let data = [...sentences.map((pair, i) => ({source: pair[sourceLang], target: pair[targetLang], extras: extras[pair[targetLang]]}))];
    let tasks: CommonTask[] = [];

    while(tasks.length < maxQ) {
        const i = Math.floor(Math.random() * data.length);
        const task = data.splice(i, 1)[0];
        tasks.push(task);
    }
    return tasks;
}

export function makeAnswerString(task: CommonTask | TranslationTask) {
    return `${task.source} = ${task.target}`
}

export const SUCCESS = ['Correct!', 'Right you are!', 'Splendid!', 'Good job!', 'Fantastic!', 'Odlično!', 'Tako je!', 'Točno!', 'Upravo tako!'];
export const FAIL = ['Oh, no!', 'Wrong!', 'Nije baš tako!', 'Nope!', 'Joj, pazi!', 'Oops!', 'Ajme meni!'];