import React, { Suspense, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { sentences } from "../data/translateData";
import { CommonTask, Feedback, Language } from "../types";
import { Textarea } from "../styles/styledComponents";
import { TaskText } from "../ui/Task/taskStyles";
import { makeAnswerString, makeTasks } from "../util/common";

import ErrorComponent from "./ErrorComponent";
import Task from "../ui/Task/Task";
import { initStore, makeInitState, ActionType } from "../reducers/taskStore";

const MAXQ = sentences.length;

const getInitWriteState = (targetLang: Language) => {
    return makeInitState<CommonTask>(makeTasks.bind(null, targetLang, MAXQ));
}
const checkWriteTask: (target: CommonTask, answer: string) => Feedback = (task, answer) => {
    return task.target.toLowerCase() === answer.toLowerCase() || task.extras.includes(answer.toLowerCase());
};

const Write : React.FC = () => {
    const targetLang = useLoaderData() as Language;
    const [disabled, setDisabled] = useState(true);
    const [state, dispatchAction] = useReducer(...initStore<CommonTask>(getInitWriteState(targetLang), checkWriteTask));
    const {score, feedback, complete, i, lives } = state;
    const task = state.tasks[i];
    const {source} = task;
    const ta = useRef<HTMLTextAreaElement>(null);
    
    const checkAnswer = useCallback(() => dispatchAction({type: ActionType.CHECK, payload: ta.current!.value.trim()}), [ta, dispatchAction]);
    const retry = useCallback(() => dispatchAction({type: ActionType.INIT}), [dispatchAction]);
    const nextTask = useCallback(() => {
        if (lives < 0) dispatchAction({type: ActionType.FAIL});
        else if (i === MAXQ - 1) dispatchAction({type: ActionType.SUCCESS});
        else dispatchAction({type: ActionType.NEXT})
    }, [lives, i, dispatchAction]);

    const updateDisabled = useCallback((e : React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.trim()) setDisabled(false)
        else setDisabled(true);
    }, [setDisabled]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!disabled) {
                if (feedback === null) checkAnswer();
                else nextTask();
            }
        }
    }, [feedback, disabled, checkAnswer, nextTask]);

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

