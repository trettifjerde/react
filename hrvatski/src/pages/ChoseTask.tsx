import React from "react";
import { Grid } from "../styles/styledComponents";
import { NavLink } from "react-router-dom";

const ChooseTaskPage : React.FC = () => {
    return <Grid>
        <NavLink to="biti">"biti"</NavLink>
        <NavLink to="random">One random verb</NavLink>
        <NavLink to="prezent">Random verbs</NavLink>
    </Grid>
};

export default ChooseTaskPage;