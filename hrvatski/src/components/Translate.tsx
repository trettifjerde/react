import React, { Fragment, Suspense, useCallback, useReducer } from "react";
import { Await, NavLink, useLoaderData } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { FAIL, SUCCESS, pickRandom } from "../util/common";
import { Language } from "../types";
import { sentences } from "../data/translateData";
import translationStateReducer, { makeInitTransState } from "../reducers/translationReducer";
import * as actions from '../reducers/translationActions';
import { H3, H5, WordSet, Word, Sentence, TranslateTask, Task, TaskControl } from '../styles/styledComponents';

import ErrorComponent from "./ErrorComponent";
import Comment from "../ui/Comment";

const MAXQ = sentences.length;

const Translate : React.FC = () => {

    const targetLang = useLoaderData() as Language;
    const [state, dispatchAction] = useReducer(translationStateReducer, makeInitTransState(targetLang, MAXQ));
    const {answers, score, complete, feedback} = state;
    const {source, suggestions, target} = state.tasks[state.i];

    const checkAnswer = () => {
        if (answers.length > 0) dispatchAction(new actions.TransCheckAnswer());
    };
    const selectWord = (id: number) => {
        if (feedback === null && !answers.includes(id)) dispatchAction(new actions.TransSelect(id));
    };
    const unselectWord = (id: number) => {
        if (feedback === null) dispatchAction(new actions.TransUnselect(id))
    };
    const nextTask = () => {
        if (state.i < state.tasks.length - 1) dispatchAction(new actions.TransNextQuestion());
        else dispatchAction(new actions.TransComplete());
    };
    const retry = useCallback(() => dispatchAction(new actions.TransInitAction(targetLang, MAXQ)), [dispatchAction, targetLang]);

    console.log(feedback);
    return (
        <Suspense>
            <Await resolve={targetLang} errorElement={<ErrorComponent />}>
                <TranslateTask>
                    {! complete && <Fragment>
                        <Task>
                            <H3>Score: {score}/{MAXQ}</H3>
                            <Sentence>{source}</Sentence>
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

                        <TaskControl>
                            {feedback && <button type="button" className="btn" onClick={nextTask}>Next</button>}
                            {feedback === false && <button type="button" className="btn" onClick={nextTask}>Got it!</button>}
                            {feedback === null && <button type="button" className="btn" onClick={checkAnswer}>Check</button>}
                        </TaskControl>

                        <Comment visible={feedback === true}>
                            <H3>{pickRandom(SUCCESS)}</H3>
                        </Comment>

                       <Comment visible={feedback === false} className="f">
                            <H3>{pickRandom(FAIL)}</H3>
                            <div><H5>{source} = {target}</H5></div>
                        </Comment>

                    </Fragment>
                    }

                    <Comment visible={complete} className="main">
                        <Sentence>Your score is</Sentence>
                        <Sentence><H3>{score}/{MAXQ}</H3></Sentence>
                        <button className="btn" type="button" onClick={retry}>Retry</button>
                        <NavLink className="btn outline" to="/translate">Back to Translations</NavLink>
                    </Comment>
                </TranslateTask>
            </Await>
        </Suspense>
    )
}

export default Translate;