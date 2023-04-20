import { NavLink } from 'react-router-dom';
import { Grid } from '../styles/styledComponents';
import { Fragment } from 'react';

const Home = () => {
    return (
        <Fragment>
            <Grid>
                <NavLink to="translate">Translate</NavLink>
                <NavLink to="write">Write</NavLink>
            </Grid>
        </Fragment>
    )
}

export default Home;