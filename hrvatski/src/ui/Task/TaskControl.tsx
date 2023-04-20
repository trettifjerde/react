import React from "react";
import styled from "styled-components";
import { Feedback } from "../../types";

const StyledTaskControl = styled.div`
    position: absolute;
    width: 100%;
    bottom: 5rem;
    overflow: hidden;
    z-index: 5;

    &.main { position: static;}
`;

const TaskControl: React.FC<{
    disabled: boolean, 
    feedback: Feedback, 
    check: () => void, 
    next: () => void
}> = React.memo(({feedback, disabled, check, next}) => {
    
    console.log('Task control');

    let text, handler;
    switch(feedback) {
        case true:
            text = 'Next';
            handler = next;
            break;
        case false:
            text = 'Got it';
            handler = next;
            break;
        case null:
            text = 'Check';
            handler = check;
            break;
    }

    return <StyledTaskControl>
            <button type="button" className="btn" disabled={disabled} onClick={handler}>{text}</button>
        </StyledTaskControl>;
});

export default TaskControl;