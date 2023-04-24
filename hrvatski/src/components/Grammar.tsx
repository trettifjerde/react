import { FC, Fragment, Suspense, useCallback, useReducer, useState} from 'react';
import Task from '../ui/Task/Task';
import { ActionType, GrammarTask as GT, TaskStoreConfig } from '../types';
import { Purple } from '../styles/styledComponents';
import GrammarTask from '../ui/GrammarTask';
import { Await, useLoaderData } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';


const maxQ = 10;

const Grammar: FC<{todo: string}> = ({todo}) => {
    const {reducer, initState} = useLoaderData() as TaskStoreConfig<GT>;
    const [state, dispatch] = useReducer(reducer, initState);
    const [answer, setAnswer] = useState('');
    const {i, complete, lives, feedback, tasks, score} = state;
    const task = tasks[i];

    const selectAnswer = useCallback((word: string) => setAnswer(word), [setAnswer]);

    const retry = useCallback(() => dispatch({type: ActionType.INIT}), [dispatch]);
    const check = () => dispatch({type: ActionType.CHECK, payload: answer});
    const next = useCallback(() => {
        if (lives < 0) dispatch({type: ActionType.FAIL});
        else if (i === maxQ - 1) dispatch({type: ActionType.SUCCESS})
        else dispatch({type: ActionType.NEXT})
    }, [lives, i, dispatch]);

    const getAnswerComment = useCallback((task: GT) => {
        return <Fragment>
            <span>{task.start}</span>
            <Purple>{task.form}</Purple>
            <span>{task.end}</span>
            </Fragment>
    }, []);

    return (
        <Suspense>
            <Await resolve={reducer} errorElement={<ErrorComponent />}>
                <Task todo={todo}
                    i={i} complete={complete} score={score} maxQ={maxQ}
                    feedback={feedback} answer={getAnswerComment(task)} lives={lives} disabled={!answer}
                    retry={retry} check={check} next={next}
                >
                    <GrammarTask task={task} selectWord={selectAnswer} />
                </Task>
            </Await>
        </Suspense>
    )
}

export default Grammar;