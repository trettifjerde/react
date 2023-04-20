import React, { Fragment, Suspense, useCallback, useEffect, useReducer } from "react";
import { Await, NavLink, useLoaderData } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Language } from "../types";
import { sentences } from "../data/translateData";
import translationStateReducer, { makeInitTransState } from "../reducers/translationReducer";
import * as actions from '../reducers/translationActions';
import { H3, H5, WordSet, Word, Sentence, Task, TaskContainer, TaskText, Lives, TaskHeader, Mini } from '../styles/styledComponents';

import ErrorComponent from "./ErrorComponent";
import Comment from "../ui/Comment";
import TaskControl from "../ui/TaskControl";
import Score from "../ui/Score";

const MAXQ = sentences.length;

const Translate : React.FC = () => {

    const targetLang = useLoaderData() as Language;
    const [state, dispatchAction] = useReducer(translationStateReducer, makeInitTransState(targetLang, MAXQ));
    const {answers, score, complete, feedback, i, lives} = state;
    const {source, suggestions, target} = state.tasks[i];
   
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
                <TaskContainer>
                    {! complete && <Fragment>
                        <Task>
                            <TaskHeader>
                                <Sentence>{i + 1}/{MAXQ}</Sentence>
                                <Lives>
                                    <i className={lives < 3 ? 'f' : ''}/>
                                    <i className={lives < 2 ? 'f' : ''}/>
                                    <i className={lives < 1 ? 'f' : ''}/>
                                </Lives>
                            </TaskHeader>
                            <TaskText>{source}</TaskText>
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

                    <Score visible={complete} lives={lives} maxQ={MAXQ} score={score}>
                        <button className="btn" type="button" onClick={retry}>Retry</button>
                        <NavLink className="btn outline" to="/translate">Back to Translations</NavLink>
                    </Score>
                </TaskContainer>
            </Await>
        </Suspense>
    )
}

export default Translate;