import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getToken } from '../helpers/authService';
import { registerLogIn } from "../store/complexActions";

import NavigationHeader from '../components/NavigationHeader';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const Root = () => {
    const isSubmitting = useSelector(state => state.general.isSubmitting);
    const [isSpinnerVisible, setSpinnerVisible] = useState(null);
    const dispatch = useDispatch();

    //autologin if token in storage
    useEffect(() => {
        const tokenInfo = getToken();
        if (tokenInfo) dispatch(registerLogIn(tokenInfo));
    }, [dispatch]);

    useEffect(() => {
        if (isSubmitting) {
            const timer = setTimeout(() => setSpinnerVisible(true), 200);
            return () => clearTimeout(timer);
        }
        else setSpinnerVisible(false);
    }, [isSubmitting, setSpinnerVisible]);
    
    return (
        <Fragment>
            <NavigationHeader />
            <main className='container'>
                <Outlet />
            </main>
            <Alert />
            {isSpinnerVisible && <Spinner className="root"/>}
        </Fragment>
    )
}

export default Root;
