import React, { Fragment, ReactNode } from "react";
import { TaskContainer, Task as StyledTask } from "./taskStyles";
import TaskHeader from "./TaskHeader";
import Score from "./Score";
import TaskControl from "./TaskControl";
import { Feedback } from "../../types";
import TaskComments from "./TaskComments";
import { NavLink } from "react-router-dom";
import { Sentence } from "../../styles/styledComponents";

const Task: React.FC<{
    complete: boolean, 
    lives: number, 
    i: number, 
    maxQ: number,
    children: ReactNode,
    disabled: boolean,
    feedback: Feedback,
    answer: string | ReactNode,
    score: number,
    next: () => void,
    check: () => void,
    retry: () => void
}> = ({complete, lives, i, maxQ, children, disabled, feedback, answer, score, next, check, retry}) => {

    console.log('task component');

    return (
        <TaskContainer>
            <Score visible={complete} lives={lives} maxQ={maxQ} score={score}>
                <button className="btn" type="button" onClick={retry}>Retry</button>
                <NavLink className="btn outline" to="../../">Back to other tasks</NavLink>
            </Score>

            {! complete && <Fragment>
                <StyledTask>
                    <TaskHeader lives={lives} i={i} maxQ={maxQ} />
                    { children }
                </StyledTask>

                <TaskControl disabled={disabled}
                    feedback={feedback} 
                    check={check} next={next}
                />
                <TaskComments feedback={feedback} answer={answer} />

            </Fragment>
            }
        </TaskContainer>
    )
}

export default Task;