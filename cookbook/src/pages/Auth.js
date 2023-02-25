import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, redirect, useActionData, Link } from 'react-router-dom';

import { logIn, setToken, signUp } from '../helpers/authService';
import { store } from '../store/store';
import { generalActions, registerLogIn } from '../store/generalState';

const AuthPage = (props) => {

    const isSignUpMode  = props.mode === 'signup';
    const [errors, setErrors] = useState({});
    const actionData = useActionData();
    const dispatch = useDispatch();

    const validate = useCallback((form) => {
        const errs = {};
        for (const [key, value] of form.entries()) {
            if (!value.trim()) {
                errs[key] = 'r';
            }
            else if (key === 'email' && !/^\w+([.\-!#$%&'*+\-/=?^_`{|}~]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value)) {
                errs[key] = 'r';
            }
            else if (key === 'password' && value.length < 6) {
                errs[key] = 'r';
            }
            else if (key === 'confirmation' && value !== form.get('password')) {
                errs[key] = 'r';
            }
        }
        console.log(errs);
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }, [setErrors]);

    const onSubmitForm = useCallback((event) => {
        if (! validate(new FormData(event.target))){
            event.preventDefault();
        }
    }, [validate]);

    useEffect(() => {
        if (actionData)
            dispatch(generalActions.announceError({message: 'Invalid email or password', status: 400}))
    }, [actionData, dispatch]);

    useEffect(() => {
        setErrors({});
    }, [isSignUpMode, setErrors]);


    return (
        <div className="row fadeIn">
            <div className="col-xs-12 col-md-6 m-auto">
                <h3>Sign {isSignUpMode? 'up' : 'in'}</h3>
                <Form onSubmit={onSubmitForm} method="post" action={'/' + props.mode}>
                    <div className="form-group mb-2">
                        <div className='label-row'>
                            <label htmlFor="email">Email</label>
                            { errors.email && <p className="text-danger form-text">Must be valid email.</p>}
                        </div>
                        <input type="text" className='form-control' name="email" id="email" />
                    </div>
                    <div className="form-group mb-2">
                        <div className='label-row'>
                            <label htmlFor="password">Password</label>
                            { errors.password && <p className="text-danger form-text">
                                Must be at least 6 characters.
                            </p>}
                        </div>
                        <input type="password" className='form-control' name="password" id="password" />

                    </div>
                    { isSignUpMode && <div className="form-group mb-2">
                        <div className='label-row'>
                            <label htmlFor="confirmation">Confirm password</label>
                            { errors.confirmation && <p className="text-danger form-text">
                                Must match password.
                            </p>}
                        </div>
                        <input type="password" className='form-control' name="confirmation" id="confirmation" />
                    </div>}
                    <div className="row justify-content-between g-0 mt-4">
                        <button type="submit" className="btn btn-success col-md-5">
                            Sign {isSignUpMode ? 'up' : 'in'}
                        </button> 
                        <Link className="btn btn-outline-success col-md-5" type="button" to={isSignUpMode ? '/login' : '/signup'}>
                            Go to sign {isSignUpMode ? 'in' : 'up'}
                        </Link>
                    </div>
                </Form>      
            </div>
        </div>
    )
}
export default AuthPage;

export async function loginAction({request}) {
    return action(request, false);
}
export async function signUpAction({request}) {
    return action(request, true);
}

async function action(request, isSignUpMode) {

    store.dispatch(generalActions.setSubmitting(true));

    const form = await request.formData();
    const data = {
        email: form.get('email'),
        password: form.get('password')
    };

    if (form.get('confirmation')) {
        data.confirmation = form.get('confirmation');
        isSignUpMode = true;
    }
    
    const fetchFunc = isSignUpMode ? signUp : logIn;

    const response = await fetchFunc(data);

    if ('error' in response) {
        store.dispatch(generalActions.announceError(response.error))
        return null;
    }
    else if (response.status === 400) {
        store.dispatch(generalActions.setSubmitting(false));
        return response;
    }
    
    try {
        const data = await response.json();
        const tokenInfo = setToken(data.idToken);
        store.dispatch(registerLogIn(tokenInfo));
        return redirect('/recipes');
    }
    catch (error) {
        store.dispatch(generalActions.announceError({message: error.message, status: 500}));
        return null;
    }    
}