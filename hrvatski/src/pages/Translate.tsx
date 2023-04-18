import React, { Fragment, useCallback, useEffect, useState, useReducer } from "react";
import { sentences, pickRandomWords } from '../data/translateData';
import styled from "styled-components";
import { SuggestionWord } from "../types";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const H3 = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

const Sentence = styled.div`
    margin-block: 1rem;
`;

const WordSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-height: 5rem;
    gap: 0.5rem;

    &.selected {
        width: 100%;
        background-color: var(--secondary-ligher);
    }
`;

const Word = styled.div`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid var(--primary-color);
    transition: background-color .2s;
`;

const Translate : React.FC = () => {

    const [i, setI] = useState(0);
    const [words, setWords] = useState<SuggestionWord[]>([]);

    const selectWord = useCallback((id: number) => {
        setWords(prev => prev.map(word => {
            if (word.id === id) word.selected = !word.selected;
            return word;
        }));
    }, [setWords]);

    const renderWords = useCallback((words: SuggestionWord[]) => {
        return words.map(word => <CSSTransition timeout={200}>
                <Word key={word.id} className={word.selected ? 'on' : 'off'} onClick={selectWord.bind(null, word.id)}>{word.word}</Word>
            </CSSTransition>)
    }, [selectWord]);

    useEffect(() => {
        setWords(pickRandomWords(i).map((word, index) => ({id: index, word: word, selected: false})))
    }, [i]);

    return (
        <Fragment>
            <H3>Translate</H3>
            <Sentence>{sentences[i].hrv}</Sentence>
            <TransitionGroup component={WordSet} className="selected">
                {words.filter(word => word.selected).map(word => <CSSTransition timeout={200}>
                    <Word onClick={selectWord.bind(null, word.id)}>{word.word}</Word>
                </CSSTransition>)}
            </TransitionGroup>
            <WordSet className="all">
                {words.map(word =><Word onClick={selectWord.bind(null, word.id)}>{word.word}</Word>)}
            </WordSet>
        </Fragment>
    )
}

export default Translate;