import MainNavigation from "../components/MainNavigation";
import { Fragment } from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    let title = 'An error has occurred';
    let message = 'Something went wrong.';
    console.log(error);

    if (error.status === 500) {
        message = error.data.message;
    }
    else if (error.status === 404) {
        title = 'Page not found';
        message = 'The requested page does not exist.'
    }

    return (
        <Fragment>
        <MainNavigation />
        <main>
            <h1>{title}</h1>
            <p>{message}</p>
        </main>
    </Fragment>
    )
}
export default ErrorPage;