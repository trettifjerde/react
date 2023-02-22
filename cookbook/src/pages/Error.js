import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import EmptyComponent from '../components/Empty';
import NavigationHeader from '../components/NavigationHeader';

const ErrorPage = () => {
    let title = 'An error has occurred';
    let message = 'Something went wrong';
    
    return (
        <Fragment>
            <NavigationHeader />
            <main>
                <h1>{title}</h1>
                <EmptyComponent message={message} />
            </main>
        </Fragment>
    )
}

export default ErrorPage;