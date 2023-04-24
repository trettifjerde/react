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

export function makeTasks(targetLang: Language, taskId: string) {
    const sourceLang = targetLang === 'hrv' ? 'en' : 'hrv';
    const extras = targetLang === 'hrv' ? hrvExtras : enExtras;
    const block = berlitz.find(b => b.path === taskId)!;
    const maxQ = block.tasks.length;
    let data = block.tasks.map(task => ({source: task[sourceLang], target: task[targetLang], extras: extras[task[targetLang].toLowerCase()] ? extras[task[targetLang].toLowerCase()] : []}));
    let tasks: CommonTask[] = [];

    while(tasks.length < maxQ) {
        const i = Math.floor(Math.random() * data.length);
        const task = data.splice(i, 1)[0];
        tasks.push(task);
    }
    return tasks;
}

export function makeAnswerString<T extends CommonTask>(task: T) {
    return `${task.source} = ${task.target}`
}

export const SUCCESS = ['Correct!', 'Right you are!', 'Splendid!', 'Good job!', 'Fantastic!', 'Odlično!', 'Tako je!', 'Točno!', 'Upravo tako!'];
export const FAIL = ['Oh, no!', 'Wrong!', 'Nije baš tako!', 'Nope!', 'Joj, pazi!', 'Oops!', 'Ajme meni!'];