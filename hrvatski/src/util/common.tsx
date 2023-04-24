import { makeNegationsTasks } from "../data/grammarData";
import { enExtras, hrvExtras, berlitz } from "../data/translateData";
import { Language, CommonTask } from "../types";

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

export function makeBerlitzTasks(level: number, targetLang: Language) {
    const sourceLang = targetLang === 'hrv' ? 'en' : 'hrv';
    const extras = targetLang === 'hrv' ? hrvExtras : enExtras;
    const block = berlitz[level];
    const maxQ = block.sentences.length;
    let data = block.sentences.map(task => ({source: task[sourceLang], target: task[targetLang], extras: extras[task[targetLang].toLowerCase()] ? extras[task[targetLang].toLowerCase()] : []}));
    const tasks: CommonTask[] = [];

    while(tasks.length < maxQ) {
        const i = pickRandomIndex(data.length);
        const task = data.splice(i, 1)[0];
        tasks.push(task);
    }
    return tasks;
}

export function makeBerlitzNegationTasks(level: number) {
    const verbs = berlitz[level].vocabulary.verbs!;
    let data = makeNegationsTasks(verbs);
    const maxQ = data.length;
    const tasks: CommonTask[] = [];

    while(tasks.length < maxQ) {
        const task = data.splice(pickRandomIndex(data.length), 1)[0];
        tasks.push(task);
    }
    return tasks
}

export function makeAnswerString<T extends CommonTask>(task: T) {
    return `${task.source} = ${task.target}`
}

export const SUCCESS = ['Correct!', 'Right you are!', 'Splendid!', 'Good job!', 'Fantastic!', 'Odlično!', 'Tako je!', 'Točno!', 'Upravo tako!'];
export const FAIL = ['Oh, no!', 'Wrong!', 'Nije baš tako!', 'Nope!', 'Joj, pazi!', 'Oops!', 'Ajme meni!'];