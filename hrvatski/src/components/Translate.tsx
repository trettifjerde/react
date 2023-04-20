import React, { Suspense, useCallback, useReducer } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Language } from "../types";
import { sentences } from "../data/translateData";
import translationStateReducer, { makeInitTransState } from "../reducers/translationReducer";
import * as actions from '../reducers/translationActions';
import { WordSet, Word } from '../styles/styledComponents';

import ErrorComponent from "./ErrorComponent";
import Task from "../ui/Task/Task";
import { makeAnswerString } from "../util/common";
import { TaskText } from "../ui/Task/taskStyles";

const MAXQ = sentences.length;

const Translate : React.FC = () => {

    const targetLang = useLoaderData() as Language;
    const [state, dispatchAction] = useReducer(translationStateReducer, makeInitTransState(targetLang, MAXQ));
    const {answers, score, complete, feedback, i, lives} = state;
    const task = state.tasks[i];
    const suggestions = task.suggestions;
   
    const selectWord = (id: number) => {
        if (feedback === null && !answers.includes(id)) dispatchAction(new actions.TransSelect(id));
    };
    const unselectWord = (id: number) => {
        if (feedback === null) dispatchAction(new actions.TransUnselect(id))
    };

    const checkAnswer = useCallback(() => dispatchAction(new actions.TransCheckAnswer()), [dispatchAction]);
    const nextTask = useCallback(() => {
        if (lives < 0) 
            dispatchAction(new actions.TransFail());
        else if (i === MAXQ - 1) 
            dispatchAction(new actions.TransComplete())
        else 
            dispatchAction(new actions.TransNextQuestion())
    }, [dispatchAction, i, lives]);

    const retry = useCallback(() => dispatchAction(new actions.TransInitAction(targetLang, MAXQ)), [dispatchAction, targetLang]);

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
                        {answers.map(id => <CSSTransition timeout={200} key={id}>
                            <Word onClick={unselectWord.bind(null, id)}>{suggestions[id].word}</Word>
                        </CSSTransition>)}
                    </TransitionGroup>
                    <WordSet className="all">
                        {suggestions.map(word => (
                            <Word key={word.id} className={answers.includes(word.id) ? 'on' : 'off'}
                            onClick={selectWord.bind(null, word.id)}>{word.word}</Word>)
                        )}
                    </WordSet>
                </Task>
            </Await>
        </Suspense>
    )
}

export default Translate;