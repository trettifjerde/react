import { Fragment } from 'react';
import Header from '../components/layout/Header';

const ErrorPage = () => {
    return (
        <Fragment>
            <Header />
            <main>
                <h3>An error has occurred</h3>
                <p>Could not find this page</p>
            </main>
        </Fragment>
    )
}
export default ErrorPage;