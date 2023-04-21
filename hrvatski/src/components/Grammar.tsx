import { FC, Fragment, useCallback, useEffect, useReducer, useState} from 'react';
import Task from '../ui/Task/Task';
import { Feedback, GrammarTask as GT } from '../types';
import { VERB_TASKS_PRESENT, makeGrammarTasks } from '../data/grammarData';
import { ActionType, initStore, makeInitState } from '../reducers/taskStore';
import { Purple } from '../styles/styledComponents';
import GrammarTask from '../ui/GrammarTask';

const getInitGrammarState = () => {
    return makeInitState<GT>(makeGrammarTasks);
}
const checkGrammarTask: (task: GT, answer: string) => Feedback = (task, answer) => {
    console.log(task.form, answer);
    return task.form === answer;
};

const emptyWord = '___';

const maxQ = VERB_TASKS_PRESENT.length;

const Grammar: FC = () => {
    const [state, dispatch] = useReducer(...initStore<GT>(getInitGrammarState(), checkGrammarTask));
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
        <Task 
            i={i} complete={complete} score={score} maxQ={maxQ}
            feedback={feedback} answer={getAnswerComment(task)} lives={lives} disabled={!answer}
            retry={retry} check={check} next={next}
        >
            <GrammarTask task={task} selectWord={selectAnswer} />
        </Task>
    )
}

export default Grammar;