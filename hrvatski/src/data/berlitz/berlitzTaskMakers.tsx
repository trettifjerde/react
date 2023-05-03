import { CommonTask, Language } from "../../types";
import { pickRandomIndex } from "../../util/common";
import { makeNegationsTasks, makeSuggestionWords } from "../../util/taskMakers";
import { berlitz } from "./berlitz";
import { enExtras, hrvExtras } from "./berlitzExtras";

export function makeBerlitzTasks(level: number, targetLang: Language) {
    console.log('making berlitz tasks');
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
    return {tasks: tasks, instruction: `Write this in ${targetLang === 'hrv' ? 'Croatian' : 'English'}`};
}

export function makeBerlitzNegationTasks(level: number) {
    let data = makeNegationsTasks(berlitz[level].vocabulary);
    const maxQ = data.length;
    const tasks: CommonTask[] = [];

    while(tasks.length < maxQ) {
        const task = data.splice(pickRandomIndex(data.length), 1)[0];
        tasks.push(task);
    }
    return {tasks: tasks, instruction: "Make a NEGATIVE sentence in present"}
}

export function makeBerlitzWordBlocksTasks(level: number, lang: Language) {
    console.log('making berlitzword blocks');
    const {tasks, instruction} = makeBerlitzTasks(level, lang);
    return {
        tasks: tasks.map(task => ({...task, suggestions: makeSuggestionWords(task.target, lang, 4)})),
        instruction
    }
};