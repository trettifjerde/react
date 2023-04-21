import React, { Suspense, useCallback, useEffect, useReducer, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Feedback, Language, TranslationTask } from "../types";
import { sentences } from "../data/translateData";
import { makeAnswerString, makeTasks } from "../util/common";
import { WordSet, Word } from '../styles/styledComponents';
import { TaskText } from "../ui/Task/taskStyles";

import { initStore, makeInitState, ActionType } from "../reducers/taskStore";

import ErrorComponent from "./ErrorComponent";
import Task from "../ui/Task/Task";
import { makeSuggestionWords } from "../util/translate";


const MAXQ = sentences.length;
function makeTranslationTasks(targetLang: Language, maxQ: number): TranslationTask[] {
    const tasks = makeTasks(targetLang, maxQ).map(task => ({...task, suggestions: makeSuggestionWords(task.target, targetLang, 4)}));
    return tasks;
}
const getInitTranslationState = (targetLang: Language) => {
    return makeInitState<TranslationTask>(makeTranslationTasks.bind(null, targetLang, MAXQ));
}
const checkTranslationTask: (target: TranslationTask, answer: string) => Feedback = (task, answer) => {
    return answer === task.target || task.extras.includes(answer);
};

const Translate : React.FC = () => {
    const targetLang = useLoaderData() as Language;
    const [state, dispatchAction] = useReducer(...initStore<TranslationTask>(getInitTranslationState(targetLang), checkTranslationTask));
    const [answers, setAnswers] = useState<{word: string, id: number}[]>([]);
    const {score, complete, feedback, i, lives} = state;
    const task = state.tasks[i];
    const suggestions = task.suggestions;
   
    const selectWord = (id: number) => {
        if (feedback === null && !answers.find(a => a.id === id))
            setAnswers(prev => ([...prev, {id: id, word: suggestions[id].word}]));
    };
    const unselectWord = (id: number) => {
        if (feedback === null) setAnswers(prev => prev.filter(w => w.id !== id));
    };

    const checkAnswer = useCallback(() => 
        dispatchAction({type: ActionType.CHECK, payload: answers.map(a => a.word).join(' ')}
    ), [answers, dispatchAction]);

    const nextTask = useCallback(() => {
        if (lives < 0) 
            dispatchAction({type: ActionType.FAIL});
        else if (i === MAXQ - 1) 
            dispatchAction({type: ActionType.SUCCESS})
        else 
            dispatchAction({type: ActionType.NEXT})
    }, [dispatchAction, i, lives]);

    const retry = useCallback(() => dispatchAction({type: ActionType.INIT}), [dispatchAction]);

    useEffect(() => {
        setAnswers([]);
    }, [i]);

    return (
        <Suspense>
            <Await resolve={targetLang} errorElement={<ErrorComponent />}>
                <Task 
                    complete={complete} feedback={feedback} 
                    score={score} i={i} maxQ={MAXQ} lives={lives}
                    check={checkAnswer} retry={retry} next={nextTask} 
                    answer={makeAnswerString(task)} disabled={answers.length === 0}
                >
                    <TaskText>{task.source}</TaskText>
                    <TransitionGroup component={WordSet} className="selected">
                        {answers.map(({id, word}) => <CSSTransition timeout={200} key={id}>
                            <Word onClick={unselectWord.bind(null, id)}>{word}</Word>
                        </CSSTransition>)}
                    </TransitionGroup>
                    <WordSet className="all">
                        {suggestions.map(word => (
                            <Word key={word.id} className={answers.find(a => a.id === word.id) ? 'on' : 'off'}
                            onClick={selectWord.bind(null, word.id)}>{word.word}</Word>)
                        )}
                    </WordSet>
                </Task>
            </Await>
        </Suspense>
    )
}

export default Translate;