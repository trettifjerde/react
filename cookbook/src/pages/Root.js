import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import Alert from '../components/Alert';

const Root = () => {
    console.log('Root');
    return (
        <Fragment>
            <NavigationHeader />
            <main className='container'>
                <Outlet />
            </main>
            <Alert />
        </Fragment>
    )
}

export default Root;
