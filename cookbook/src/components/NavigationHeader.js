import { NavLink } from 'react-router-dom';

const NavigationHeader = () => {
    const user = false;

    const logout = () => {

    }

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
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/list">Shopping List</NavLink>
                    </li>
                </ul>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        {! user && <NavLink className="nav-link" to="/login">Sign in</NavLink>}
                        {user && <NavLink className="nav-link" style={() => ({cursor: 'pointer'})} onClick={logout}>Log out</NavLink> }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationHeader;