import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import React, { ReactNode } from "react";

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

    &.main { 
        position: static;
        padding: 2rem;
    }

    &.main, &.f { 
        & h3 {color: var(--primary-color);}
    }

    &.enter { animation: jumpUp .3s forwards; }
    &.exit { animation: slideDown .3s forwards; }
`;

const Comment : React.FC<{children: ReactNode, visible: boolean, className?: string}> = ({children, visible, className}) => {
    console.log(visible, className, children);
    return (
        <CSSTransition in={visible} timeout={300} classNames={{enter: 'enter', exit: 'exit'}} mountOnEnter unmountOnExit>
            <StyledComment className={className}>
                {children}
            </StyledComment>
        </CSSTransition>
    )
}

export default Comment;