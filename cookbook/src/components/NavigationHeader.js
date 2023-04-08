import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { registerLogOut } from '../store/complexActions';

const NavigationHeader = () => {
    const user = useSelector(state => state.general.user);
    const dispatch = useDispatch();

    const logout = useCallback(() => {
        dispatch(registerLogOut(user.timer));
    }, [dispatch, user]);

    return (
        <nav className="navbar navbar-expand p-3">
            <div className="navbar-header">
                <NavLink className="navbar-brand" to="/">Cookbook</NavLink>
            </div>
            <div className="navbar w-100">
                <ul className="nav nav-tabs flex-grow-1">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
                    </li>
                    { user && <li className="nav-item">
                        <NavLink className="nav-link" to="/list">Shopping List</NavLink>
                    </li>}
                </ul>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        {! user && <NavLink className="nav-link" to="/login">Sign in</NavLink>}
                        {user && <button className="nav-link" onClick={logout}>Log out</button> }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationHeader;