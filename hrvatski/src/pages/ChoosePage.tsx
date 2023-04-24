import React, { Fragment } from "react";
import { Grid, GridItem } from "../styles/styledComponents";
import { NavLink, useLoaderData } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PathsInfo, LoaderArgs } from "../types";

const ChoosePage : React.FC<{animationName: string}> = ({animationName}) => {
    const {paths, back} = useLoaderData() as PathsInfo;
    return <Fragment>
        {back && <NavLink className="btn b-link" to="../">Back</NavLink>}
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