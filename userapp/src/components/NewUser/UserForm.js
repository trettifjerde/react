import { useState } from "react";
import './UserForm.css';

function UserForm(props) {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [isUsernameValid, setUsernameValid] = useState(true);
    const [isAgeValid, setAgeValid] = useState(true);

    const validateForm = () => {
        const errs= {};
        if (! username.trim()) {
            errs['username'] = 'Invalid username';
            setUsernameValid(false);
        }
        else {
            setUsernameValid(true);
        }
        if (isNaN(+age) || +age < 1) {
            errs['age'] = 'Invalid age';
            setAgeValid(false);
        }
        else {
            setAgeValid(true);
        }

        if (Object.keys(errs).length > 0) {
            props.onValidationError(errs);
            return false;
        }
        return true;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (validateForm()) {
            props.onSaveUser({username: username.trim(), age: +age.toString()});
            setUsername('');
            setAge('');
        }
    };

    const usernameChangeHandler = (e) => {
        setUsernameValid(true);
        setUsername(e.target.value);
    };
    const ageChangeHandler = (e) => {
        setAgeValid(true);
        setAge(e.target.value);
    };

    return (
        <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-control">
                <label>Username</label>
                <input type="text" className={isUsernameValid ? '' : 'invalid'} value={username} onChange={usernameChangeHandler}/>
            </div>
            <div className="form-control">
                <label>Age (Years)</label>
                <input type="number" className={isAgeValid ? '' : 'invalid'}  value={age} onChange={ageChangeHandler}/>
            </div>
            <div className="form-actions">
                <button type="submit">Add User</button>
            </div>
        </form>
    )
}

export default UserForm;