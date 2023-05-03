import React, { Suspense, useCallback, useEffect, useReducer, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ActionType, TaskStoreConfig, TranslationTask } from "../types";
import { makeAnswerString } from "../util/common";
import { WordSet, Word } from '../styles/styledComponents';
import { TaskText } from "../ui/Task/taskStyles";

import ErrorComponent from "./ErrorComponent";
import Task from "../ui/Task/Task";

const WordBlocks : React.FC = () => {
    const {reducer, initState} = useLoaderData() as TaskStoreConfig<TranslationTask>;
    const [state, dispatchAction] = useReducer(reducer, initState);
    const [answers, setAnswers] = useState<{word: string, id: number}[]>([]);
    const {score, complete, feedback, i, lives, tasks, instruction} = state;
    const suggestions = tasks[i].suggestions;
   
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
        else if (i === tasks.length - 1) 
            dispatchAction({type: ActionType.SUCCESS})
        else 
            dispatchAction({type: ActionType.NEXT})
    }, [dispatchAction, i, lives, tasks]);

    const retry = useCallback(() => dispatchAction({type: ActionType.INIT}), [dispatchAction]);

    useEffect(() => {
        setAnswers([]);
    }, [i]);

    return (
        <Suspense>
            <Await resolve={reducer} errorElement={<ErrorComponent />}>
                <Task instruction={instruction}
                    complete={complete} feedback={feedback} 
                    score={score} i={i} maxQ={tasks.length} lives={lives}
                    check={checkAnswer} retry={retry} next={nextTask} 
                    answer={makeAnswerString(tasks[i])} disabled={answers.length === 0}
                >
                    <TaskText>{tasks[i].source}</TaskText>
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

export default WordBlocks;