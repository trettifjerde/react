import { FC, Fragment, Suspense, useCallback, useReducer, useState} from 'react';
import Task from '../ui/Task/Task';
import { Feedback, GrammarTask as GT } from '../types';
import { makeGrammarTasks } from '../data/grammarData';
import { ActionType, initStore, makeInitState } from '../reducers/taskStore';
import { Purple } from '../styles/styledComponents';
import GrammarTask from '../ui/GrammarTask';
import { Await, useLoaderData } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

const getInitGrammarState = (task: string) => {
    return makeInitState<GT>(makeGrammarTasks.bind(null, task));
}
const checkGrammarTask: (task: GT, answer: string) => Feedback = (task, answer) => {
    console.log(task.form, answer);
    return task.form === answer;
};

const maxQ = 10;

const Grammar: FC = () => {
    const taskName = useLoaderData() as string;

    const [state, dispatch] = useReducer(...initStore<GT>(getInitGrammarState(taskName), checkGrammarTask));
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
            <Await resolve={taskName} errorElement={<ErrorComponent />}>
                <Task 
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