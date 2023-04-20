import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import React, { ReactNode } from "react";
import { H3, Sentence } from "../styles/styledComponents";
import { FAIL, SUCCESS, pickRandom } from "../util/common";

export const StyledComment = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 5px;
    background-color: transparent;
    color: black;
    padding-block: 5rem 9rem;
    padding-inline: 2rem;
    background-color: white;

    & h3, & div { margin-block: 2rem;}
    & .btn { margin: 0.5rem;}

    &.m { 
        position: static;
        padding: 2rem;
    }

    &.m, &.f { 
        & h3 {color: var(--primary-color);}
    }

    &.enter { animation: jumpUp .3s forwards; }
    &.exit { animation: slideDown .3s forwards; }
`;

export type CommentType = 'success' | 'fail' | 'main';

const Comment : React.FC<{visible: boolean, type: CommentType, children?: ReactNode }> = ({children, visible, type}) => {
    return (
        <CSSTransition in={visible} timeout={300} classNames={{enter: 'enter', exit: 'exit'}} mountOnEnter unmountOnExit>
            <StyledComment className={type === 'fail' ? 'f' : type === 'main' ? 'm' : ''}>
                { type === 'success' && <H3>{pickRandom(SUCCESS)}</H3> }
                { type === 'fail' && <H3>{pickRandom(FAIL)}</H3> }
                { type === 'main' && <Sentence>Your score is</Sentence>}
                { children }
            </StyledComment>
        </CSSTransition>
    )
}

export default Comment;