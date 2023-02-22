import { Fragment, useEffect } from 'react';
import { Outlet, redirect, useLoaderData, useSubmit } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { getAuthToken, getTokenExpirationDate } from '../helpers/auth';

const Root = () => {
    //const navigation = useNavigation();
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) 
            return;
        else if (token === 'EXPIRED') 
            submit(null, {method: 'post', action: '/logout'});
        else {
            const timeout = getTokenExpirationDate();
            setTimeout(() => submit(null, {method: 'post', action: '/logout'}), timeout);
        }
    }, [submit, token]);

    return (
        <Fragment>
            <MainNavigation />
            <main>
                
                <Outlet />
            </main>
        </Fragment>
    )
}
export default Root;
// {navigation.state === 'loading' && <p>Loading...</p>}

export function tokenLoader() {
    return getAuthToken();
}

export function authGuard() {
    const token = getAuthToken();
    if (!token) {
        return redirect('/auth');
    }
    else
        return null;
}