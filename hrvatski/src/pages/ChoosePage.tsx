import React, { Fragment } from "react";
import { Grid, GridItem } from "../styles/styledComponents";
import { NavLink, useLoaderData, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ChoosePage : React.FC<{paths: {path: string, name: string}[], animationName: string}> = ({paths, animationName}) => {
    const location = useLocation();
    return <Fragment>
        {location.pathname !== "/" && <NavLink className="btn b-link" to="../">Back</NavLink>}
        <TransitionGroup component={Grid} appear exit={false}>
            {paths.map((path, i) => <CSSTransition key={path.path} timeout={100 * i + 300}>
                    <GridItem index={i} duration={300} name={animationName}>
                        <NavLink to={path.path}>{path.name}</NavLink>
                    </GridItem>
                </CSSTransition>
            )}
        </TransitionGroup>
    </Fragment>
};

export default ChoosePage;