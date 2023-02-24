import { Fragment } from 'react';
import EmptyComponent from '../components/Empty';
import NavigationHeader from '../components/NavigationHeader';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);    
    
    let title = 'An error has occurred';
    let message = 'Something went wrong';

    if (error.data)
        message = error.data;
    
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