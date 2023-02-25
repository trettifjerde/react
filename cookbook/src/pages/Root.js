import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getToken } from '../helpers/authService';
import { registerLogIn } from "../store/generalState";

import NavigationHeader from '../components/NavigationHeader';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const Root = () => {
    const isSubmitting = useSelector(state => state.general.isSubmitting);
    const dispatch = useDispatch();

    //autologin if token in storage
    useEffect(() => {
        const tokenInfo = getToken();
        if (tokenInfo) dispatch(registerLogIn(tokenInfo));
    }, [dispatch]);
    
    return (
        <Fragment>
            <NavigationHeader />
            <main className='container'>
                <Outlet />
            </main>
            <Alert />
            {isSubmitting && <Spinner className="root"/>}
        </Fragment>
    )
}

export default Root;
