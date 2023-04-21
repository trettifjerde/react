import { FC, useCallback, useReducer, useState} from 'react';
import Task from '../ui/Task/Task';
import { TaskText } from '../ui/Task/taskStyles';
import { Feedback, GrammarTask } from '../types';
import { VERB_TASKS_PRESENT, makeGrammarTasks } from '../data/grammarData';
import { initStore, makeInitState } from '../reducers/taskStore';
import { Word, WordSet } from '../styles/styledComponents';

const getInitGrammarState = () => {
    return makeInitState<GrammarTask>(makeGrammarTasks);
}
const checkGrammarTask: (task: GrammarTask, answer: string) => Feedback = (task, answer) => {
    return task.form === answer;
};

const maxQ = VERB_TASKS_PRESENT.length;

const Grammar: FC = () => {
    const [state, dispatch] = useReducer(...initStore<GrammarTask>(getInitGrammarState(), checkGrammarTask));
    const [answer, setAnswer] = useState<number | null>(null);
    const {i, complete, lives, feedback, tasks, score} = state;
    const task = tasks[i];

    const selectAnswer = useCallback((i: number) => setAnswer(i), [setAnswer]);
    const retry = () => {};
    const check = () => {};
    const next = () => {};
    return (
        <Task 
            i={i} complete={complete} score={score} maxQ={maxQ}
            feedback={feedback} answer={''} lives={lives} disabled={answer === null}
            retry={retry} check={check} next={next}
        >
            <TaskText>{task.start}    {task.end}</TaskText>
            <WordSet className="all">
                {task.suggestions.map((word, i) => (
                    <Word key={i} className={answer === i ? 'on' : 'off'}
                    onClick={selectAnswer.bind(null, i)}>{word}</Word>)
                )}
            </WordSet>
        </Task>
    )
}

export default Grammar;