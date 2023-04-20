import React, { Fragment, Suspense, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Await, NavLink, useLoaderData } from "react-router-dom";

import { sentences } from "../data/translateData";
import { makeInitWriteState, writeReducer } from "../reducers/writeReducer";
import { Language } from "../types";
import { H3, H5, Sentence, Task, TaskContainer, Textarea } from "../styles/styledComponents";

import Comment from "../ui/Comment";
import ErrorComponent from "./ErrorComponent";
import TaskControl from "../ui/TaskControl";
import { WriteCheckAction, WriteCompleteAction, WriteInitAction, WriteNextAction } from "../reducers/writeActions";

const MAXQ = sentences.length;

const Write : React.FC = () => {
    const targetLang = useLoaderData() as Language;
    const [disabled, setDisabled] = useState(true);
    const [state, dispatchAction] = useReducer(writeReducer, makeInitWriteState(targetLang, MAXQ));
    const {score, feedback, complete, i } = state;
    const task = state.tasks[i];
    const {source, target} = task;
    const ta = useRef<HTMLTextAreaElement>(null);

    console.log(task);

    const nextTask = useCallback(() => {
        if (i === MAXQ - 1) dispatchAction(new WriteCompleteAction());
        else dispatchAction(new WriteNextAction())
    }, [i, dispatchAction]);
    const checkAnswer = useCallback(() => dispatchAction(new WriteCheckAction(ta.current!.value.trim())), [ta, dispatchAction]);
    const retry = useCallback(() => dispatchAction(new WriteInitAction(targetLang, MAXQ)), [targetLang, dispatchAction]);

    const updateDisabled = useCallback((e : React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.trim()) 
            setDisabled(false)
        else 
            setDisabled(true);
    }, [setDisabled]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) {
                if (feedback === null) checkAnswer();
                else nextTask();
            }
        }
    }, [feedback, disabled, checkAnswer]);

    useEffect(() => {
        if (ta.current) {
            ta.current.value = '';
            ta.current.focus();
            setDisabled(true);
        }
    }, [i]);

    return (
        <Suspense>
            <Await resolve={targetLang} errorElement={<ErrorComponent />}>
                <TaskContainer>
                    {!complete && <Fragment>
                        <Task>
                            <H3>Score: {score} / {MAXQ}</H3>
                            <Sentence>{source}</Sentence>
                            <Textarea ref={ta} onChange={updateDisabled} onKeyDown={handleKeyDown}></Textarea>
                        </Task>
                        <TaskControl disabled={disabled} feedback={feedback} check={checkAnswer} next={nextTask}></TaskControl>

                        <Comment visible={feedback === true} type="success"></Comment>
                        <Comment visible={feedback === false} type="fail">
                            <div><H5>{source} = {target}</H5></div>
                        </Comment>
                    </Fragment>}

                    {complete && <Comment visible={complete} type="main">
                        <Sentence><H3>{score}/{MAXQ}</H3></Sentence>
                        <button className="btn" type="button" onClick={retry}>Retry</button>
                        <NavLink className="btn outline" to="/write">Back to Write</NavLink>
                    </Comment>}
                </TaskContainer>
            </Await>
        </Suspense>
    )
};
export default Write;