import { NavLink } from 'react-router-dom';
import { Grid, GridItem } from '../styles/styledComponents';
import { Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const tasks = ['translate', 'write', 'grammar'];


const Home = () => {
    return (
        <Fragment>
            <TransitionGroup component={Grid} className="st" appear>
                {tasks.map((t, i) => <CSSTransition key={i} timeout={100 * i + 200}>
                        <GridItem index={i} duration={200} name='jumpUp'>
                            <NavLink to={t}>{t[0].toUpperCase() + t.slice(1)}</NavLink>
                        </GridItem>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </Fragment>
    )
}

export default Home;