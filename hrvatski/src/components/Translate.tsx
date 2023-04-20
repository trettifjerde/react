import React, { Fragment, Suspense, useCallback, useReducer } from "react";
import { Await, NavLink, useLoaderData } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Language } from "../types";
import { sentences } from "../data/translateData";
import translationStateReducer, { makeInitTransState } from "../reducers/translationReducer";
import * as actions from '../reducers/translationActions';
import { H3, H5, WordSet, Word, Sentence, Task, TaskContainer } from '../styles/styledComponents';

import ErrorComponent from "./ErrorComponent";
import Comment from "../ui/Comment";
import TaskControl from "../ui/TaskControl";

const MAXQ = sentences.length;

const Translate : React.FC = () => {

    const targetLang = useLoaderData() as Language;
    const [state, dispatchAction] = useReducer(translationStateReducer, makeInitTransState(targetLang, MAXQ));
    const {answers, score, complete, feedback, i} = state;
    const {source, suggestions, target} = state.tasks[i];

    console.log(state);

    
    const selectWord = (id: number) => {
        if (feedback === null && !answers.includes(id)) dispatchAction(new actions.TransSelect(id));
    };
    const unselectWord = (id: number) => {
        if (feedback === null) dispatchAction(new actions.TransUnselect(id))
    };

    const checkAnswer = useCallback(() => dispatchAction(new actions.TransCheckAnswer()), [dispatchAction]);
    const nextTask = useCallback(() => {
        if (i === MAXQ - 1) 
            dispatchAction(new actions.TransComplete())
        else 
            dispatchAction(new actions.TransNextQuestion())
    }, [dispatchAction, i]);

    const retry = useCallback(() => dispatchAction(new actions.TransInitAction(targetLang, MAXQ)), [dispatchAction, targetLang]);

    return (
        <Suspense>
            <Await resolve={targetLang} errorElement={<ErrorComponent />}>
                <TaskContainer>
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

                        <TaskControl disabled={answers.length === 0}
                            feedback={feedback} 
                            check={checkAnswer} next={nextTask}
                        />

                        <Comment visible={feedback === true} type="success"></Comment>

                        <Comment visible={feedback === false} type="fail">
                            <div><H5>{source} = {target}</H5></div>
                        </Comment>

                    </Fragment>
                    }

                    <Comment visible={complete} type="main">
                        <Sentence><H3>{score}/{MAXQ}</H3></Sentence>
                        <button className="btn" type="button" onClick={retry}>Retry</button>
                        <NavLink className="btn outline" to="/translate">Back to Translations</NavLink>
                    </Comment>
                </TaskContainer>
            </Await>
        </Suspense>
    )
}

export default Translate;