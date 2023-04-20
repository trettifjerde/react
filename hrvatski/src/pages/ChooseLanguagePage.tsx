import React from "react";
import { Grid } from "../styles/styledComponents";
import { NavLink } from "react-router-dom";

const ChooseLanguagePage : React.FC = () => {
    return <Grid>
        <NavLink to="en">Croatian to English</NavLink>
        <NavLink to="hrv">English to Croatian</NavLink>
    </Grid>
};

export default ChooseLanguagePage;