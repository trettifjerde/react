import React, { Suspense, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { sentences } from "../data/translateData";
import { makeInitWriteState, writeReducer } from "../reducers/writeReducer";
import { Language } from "../types";

import ErrorComponent from "./ErrorComponent";
import { WriteCheckAction, WriteCompleteAction, WriteFailAction, WriteInitAction, WriteNextAction } from "../reducers/writeActions";
import Task from "../ui/Task/Task";
import { TaskText } from "../ui/Task/taskStyles";
import { Textarea } from "../styles/styledComponents";
import { makeAnswerString } from "../util/common";

const MAXQ = sentences.length;

const Write : React.FC = () => {
    const targetLang = useLoaderData() as Language;
    const [disabled, setDisabled] = useState(true);
    const [state, dispatchAction] = useReducer(writeReducer, makeInitWriteState(targetLang, MAXQ));
    const {score, feedback, complete, i, lives } = state;
    const task = state.tasks[i];
    const {source} = task;
    const ta = useRef<HTMLTextAreaElement>(null);

    console.log('Write component');

    const nextTask = useCallback(() => {
        if (lives < 0) dispatchAction(new WriteFailAction());
        else if (i === MAXQ - 1) dispatchAction(new WriteCompleteAction());
        else dispatchAction(new WriteNextAction())
    }, [lives, i, dispatchAction]);
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
                <Task 
                    complete={complete} feedback={feedback} 
                    score={score} i={i} maxQ={MAXQ} lives={lives}
                    check={checkAnswer} retry={retry} next={nextTask} 
                    answer={makeAnswerString(task)} disabled={disabled}
                >
                    <TaskText>{source}</TaskText>
                    <Textarea ref={ta} onChange={updateDisabled} onKeyDown={handleKeyDown}></Textarea>
                </Task>
            </Await>
        </Suspense>
    )
};
export default Write;

