import React from "react";
import { Grid, GridItem } from "../styles/styledComponents";
import { NavLink } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const tasks = [
    ['biti', '"biti"'],
    ['random', 'One random verb'],
    ['prezent', 'Random verbs']
]

const ChooseTaskPage : React.FC = () => {
    return <TransitionGroup component={Grid} appear>
        {tasks.map(([p, text], i) => <CSSTransition key={i} timeout={100 * i + 300}>
                <GridItem index={i} duration={300} name="appearFromRight">
                    <NavLink to={p}>{text}</NavLink>
                </GridItem>
            </CSSTransition>
        )}
    </TransitionGroup>
};

export default ChooseTaskPage;