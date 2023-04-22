import { Fragment, useState, FC, useEffect, useCallback } from "react"
import { Word, WordSet } from "../styles/styledComponents"
import { TaskText } from "./Task/taskStyles"
import { GrammarTask as GT, SuggestionWord } from "../types";
import { CSSTransition } from "react-transition-group";

const emptyWord = {word: '___'};
const animationTimeout = 150;

const GrammarTask: FC<{
    task: GT,
    selectWord: (s: string) => void
}> = ({task, selectWord}) => {

    const { suggestions } = task;
    const [taskText, setTaskText] = useState([task.start, task.end]);
    const [taskVisible, setTaskVisible] = useState(false);
    const [answerVisible, setAnswerVisible] = useState(true);
    const [answer, setAnswer] = useState<{word: string, id?: number}>(emptyWord);

    const handleSelect = useCallback((s: string, i: number) => {
        setAnswerVisible(false);
        setTimeout(() => {
            setAnswer({word: s, id: i});
            setAnswerVisible(true);
            selectWord(s);
        }, animationTimeout);
    }, [setAnswerVisible, setAnswer, selectWord]);

    const handleUnselect = useCallback(() => {
        setAnswerVisible(false);
        setTimeout(() => {
            setAnswer(emptyWord);
            setAnswerVisible(true);
            selectWord('');
        }, animationTimeout);
    }, [selectWord, setAnswer, setAnswerVisible]);

    useEffect(() => {
        setTaskVisible(false);
        setTimeout(() => {
            setTaskText([task.start, task.end]);
            setTaskVisible(true);
            setAnswer(emptyWord);
        }, 250);
    }, [task]);

    return (
        <Fragment>
            <TaskText>
                <CSSTransition in={taskVisible} timeout={200} className="selected swipe">
                    <WordSet>
                        <span>{taskText[0]}</span>
                        <CSSTransition in={answerVisible} timeout={animationTimeout}>
                            <Word className="s" onClick={handleUnselect}>{answer.word}</Word>
                        </CSSTransition>
                        <span>{taskText[1]}</span>
                    </WordSet>
                </CSSTransition>
            </TaskText>
            <WordSet className="all">
                {suggestions.map((s, i) => (
                    <Word key={i} className={answer.id === i ? 'on' : 'off'}
                    onClick={handleSelect.bind(null, s, i)}>{s}</Word>)
                )}
            </WordSet>
        </Fragment>
    )
}
export default GrammarTask;