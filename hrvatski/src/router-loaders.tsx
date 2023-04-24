import { json } from "react-router-dom";
import { berlitz } from "./data/translateData";
import { CommonTask, GrammarTask, Language, LoaderArgs, PathsInfo, TaskStoreConfig, TranslationTask } from "./types";
import { initStore, makeInitState } from "./reducers/taskStore";
import { makeBerlitzNegationTasks, makeBerlitzTasks } from "./util/common";
import { makeSuggestionWords } from "./util/translate";
import { makeGrammarTasks } from "./data/grammarData";

export function homePageLoader(l: LoaderArgs) : PathsInfo {
    return {
        paths: [
            {name: 'Berlitz', path: 'berlitz'},
            {name: 'Random', path: 'random'}
        ],
        back: false
    }
}
export function berlitzLoader(l: LoaderArgs) : PathsInfo {
    return {
        paths: berlitz.map(b => ({name: b.name, path: b.path})),
        back: true
    }
}
export function berlitzLevelLoader(l: LoaderArgs) : PathsInfo {
    const level = getBerlitzLevel(l);
    if (level !== null) {
        return {
            back: true,
            paths: berlitz[level].tasks.map(t => ({path: t, name: t[0].toUpperCase() + t.slice(1)}))
        }
    }
    throw json(404);
}
export function languageLoader(l: LoaderArgs) : PathsInfo {
    const level = getBerlitzLevel(l);
    if (level !== null) {
        return {
            back: true,
            paths: [{name: 'Croatian to English', path: 'en'}, {name: 'English to Croatian', path: 'hrv'}]
        }
    }
    throw json(404);
}
export function writeTaskLoader(l: LoaderArgs) : TaskStoreConfig<CommonTask> {
    const level = getBerlitzLevel(l);
    const lang = getTargetLang(l);
    if (level !== null && lang) {
        return initStore(
            makeInitState(() => makeBerlitzTasks(level, lang)),
            (task: CommonTask, answer: string) => (answer.toLowerCase() === task.target.toLowerCase() || task.extras.includes(answer.toLowerCase()))
        );
    }
    throw json(404);
}

export function negationsTaskLoader(l: LoaderArgs) : TaskStoreConfig<CommonTask> {
    console.log('negations loader');
    const level = getBerlitzLevel(l);

    const meow = initStore(
        makeInitState(() => makeBerlitzNegationTasks(level!)),
        (task: CommonTask, answer: string) => (answer === task.target)
    );
    console.log(meow);
    return meow;
}

export function translateTaskLoader(l: LoaderArgs) : TaskStoreConfig<TranslationTask> {
    const level = getBerlitzLevel(l);
    const lang = getTargetLang(l);
    if (level !== null && lang) {
        return initStore(
            makeInitState(
                () => makeBerlitzTasks(level, lang).map(task => ({...task, suggestions: makeSuggestionWords(task.target, lang, 4)}))
            ),
            (task: TranslationTask, answer: string) => (answer === task.target || task.extras.includes(answer.toLowerCase()))
        );
    }
    throw json(404);
}

export function grammarTaskLoader(l: LoaderArgs) : TaskStoreConfig<GrammarTask> {
    const task = l.params.task;
    if (task && (task === 'biti' || task === 'random' || task === 'prezent'))
        return initStore(
            makeInitState(() => makeGrammarTasks(task)),
            (task: GrammarTask, answer: string) => (task.form === answer)
        )
    throw json(404);
}

function getBerlitzLevel(l: LoaderArgs) {
    const level = l.params.level;
    return (level && !isNaN(+level) && +level <= berlitz.length) ? +level - 1 : null;
}

function getTargetLang(l: LoaderArgs) {
    const lang = l.params.lang;
    return (lang && (lang === 'hrv' || lang === 'en')) ? lang as Language: null;
}