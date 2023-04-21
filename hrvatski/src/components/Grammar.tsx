import { FC, Fragment, useCallback, useEffect, useReducer, useState} from 'react';
import Task from '../ui/Task/Task';
import { TaskText } from '../ui/Task/taskStyles';
import { Feedback, GrammarTask } from '../types';
import { VERB_TASKS_PRESENT, makeGrammarTasks } from '../data/grammarData';
import { ActionType, initStore, makeInitState } from '../reducers/taskStore';
import { Purple, Word, WordSet } from '../styles/styledComponents';

const getInitGrammarState = () => {
    return makeInitState<GrammarTask>(makeGrammarTasks);
}
const checkGrammarTask: (task: GrammarTask, answer: string) => Feedback = (task, answer) => {
    console.log(task.form, answer);
    return task.form === answer;
};

const emptyWord = {word: '___'};

const maxQ = VERB_TASKS_PRESENT.length;

const Grammar: FC = () => {
    const [state, dispatch] = useReducer(...initStore<GrammarTask>(getInitGrammarState(), checkGrammarTask));
    const [answer, setAnswer] = useState<{id?: number, word: string}>(emptyWord);
    const [taskText, setTaskText] = useState(['', '']);
    const {i, complete, lives, feedback, tasks, score} = state;
    const task = tasks[i];
    const suggestions = task.suggestions;

    const selectAnswer = useCallback((i: number, word: string) => setAnswer({id: i, word}), [setAnswer]);
    const unselectAnswer = useCallback(() => {
        if (answer.id) setAnswer(emptyWord)
    }, [answer, setAnswer]);

    const retry = useCallback(() => dispatch({type: ActionType.INIT}), [dispatch]);
    const check = () => dispatch({type: ActionType.CHECK, payload: answer.word});
    const next = useCallback(() => {
        if (lives < 0) dispatch({type: ActionType.FAIL});
        else if (i === maxQ - 1) dispatch({type: ActionType.SUCCESS})
        else dispatch({type: ActionType.NEXT})
    }, [lives, i, dispatch]);

    const getAnswerComment = useCallback((task: GrammarTask) => {
        return <Fragment>
            <span>{task.start}</span>
            <Purple>{task.form}</Purple>
            <span>{task.end}</span>
            </Fragment>
    }, []);

    useEffect(() => {
        setAnswer(emptyWord);
        setTaskText([task.start, task.end])
    }, [i, task, selectAnswer]);
    return (
        <Task 
            i={i} complete={complete} score={score} maxQ={maxQ}
            feedback={feedback} answer={getAnswerComment(task)} lives={lives} disabled={answer.id === undefined}
            retry={retry} check={check} next={next}
        >
            <TaskText>
                <WordSet className='selected'>
                    <span>{taskText[0]}</span>
                    <Word className={answer.id ? 'fadein' : 'fadeout'} onClick={unselectAnswer}>{answer.word}</Word>
                    <span>{taskText[1]}</span>
                </WordSet>
            </TaskText>
            <WordSet className="all">
                {suggestions.map((word, i) => (
                    <Word key={i} className={answer.id === i ? 'on' : 'off'}
                    onClick={selectAnswer.bind(null, i, word)}>{word}</Word>)
                )}
            </WordSet>
        </Task>
    )
}

export default Grammar;