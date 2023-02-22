import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';

const Root = () => {
    return (
        <Fragment>
            <NavigationHeader />
            <main className='container'>
                <Outlet />
            </main>
        </Fragment>
    )
}

export default Root;
