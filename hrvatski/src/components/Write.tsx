import React, { Suspense, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ActionType, CommonTask, TaskStoreConfig } from "../types";
import { Textarea } from "../styles/styledComponents";
import { TaskText } from "../ui/Task/taskStyles";
import { makeAnswerString } from "../util/common";

import ErrorComponent from "./ErrorComponent";
import Task from "../ui/Task/Task";


const Write : React.FC<{todo: string}> = ({todo}) => {
    console.log('write');
    const {reducer, initState} = useLoaderData() as TaskStoreConfig<CommonTask>;
    const [disabled, setDisabled] = useState(true);
    const [state, dispatchAction] = useReducer(reducer, initState);
    const {score, feedback, complete, i, lives, tasks } = state;
    const task = tasks[i];
    const {source} = task;
    const ta = useRef<HTMLTextAreaElement>(null);
    
    const checkAnswer = useCallback(() => dispatchAction({type: ActionType.CHECK, payload: ta.current!.value.trim()}), [ta, dispatchAction]);
    const retry = useCallback(() => dispatchAction({type: ActionType.INIT}), [dispatchAction]);
    const nextTask = useCallback(() => {
        if (lives < 0) dispatchAction({type: ActionType.FAIL});
        else if (i === tasks.length - 1) dispatchAction({type: ActionType.SUCCESS});
        else dispatchAction({type: ActionType.NEXT})
    }, [lives, i, tasks, dispatchAction]);

    const updateDisabled = useCallback((e : React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.trim()) setDisabled(false)
        else setDisabled(true);
    }, [disabled, setDisabled]);

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
            <Await resolve={reducer} errorElement={<ErrorComponent />}>
                <Task todo={todo}
                    complete={complete} feedback={feedback} 
                    score={score} i={i} maxQ={tasks.length} lives={lives}
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

