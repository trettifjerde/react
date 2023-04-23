import React, { Fragment } from "react";
import { Grid, GridItem } from "../styles/styledComponents";
import { NavLink } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const langs = [
    ['hrv', 'English to Croatian'],
    ['en', 'Croatian to English']
]

const ChooseLanguagePage : React.FC = () => {
    return <TransitionGroup component={Grid} appear>
            {langs.map(([p, text], i) => <CSSTransition key={i} timeout={100 * i + 300}>
                    <GridItem index={i} duration={300} name="appearFromLeft">
                        <NavLink to={p}>{text}</NavLink>
                    </GridItem>
                </CSSTransition>
            )}
        </TransitionGroup>
};

export default ChooseLanguagePage;