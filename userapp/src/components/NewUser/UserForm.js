import { useRef, useState } from "react";
import './UserForm.css';

function UserForm(props) {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    
    const [isUsernameValid, setUsernameValid] = useState(true);
    const [isAgeValid, setAgeValid] = useState(true);

    const validateForm = () => {
        const errs= {};

        const cleanUsername = nameInputRef.current.value.trim();
        if (! cleanUsername) {
            errs['username'] = 'Invalid username';
            setUsernameValid(false);
        }

        const cleanAge = +ageInputRef.current.value;
        if (isNaN(cleanAge) || cleanAge < 1) {
            errs['age'] = 'Invalid age';
            setAgeValid(false);
        }


        if (Object.keys(errs).length > 0) {
            props.onValidationError(errs);
            return null;
        }

        nameInputRef.current.value = '';
        ageInputRef.current.value = '';

        return {username: cleanUsername, age: cleanAge};
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const cleanData = validateForm();
        if (cleanData) {
            props.onSaveUser(cleanData);
        }
    };

    return (
        <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-control">
                <label>Username</label>
                <input type="text" ref={nameInputRef}
                    className={isUsernameValid ? '' : 'invalid'}  
                    onFocus={setUsernameValid.bind(null, true)}/>
            </div>
            <div className="form-control">
                <label>Age (Years)</label>
                <input type="number" ref={ageInputRef}
                    className={isAgeValid ? '' : 'invalid'} 
                    onFocus={setAgeValid.bind(null, true)}/>
            </div>
            <div className="form-actions">
                <button type="submit">Add User</button>
            </div>
        </form>
    )
}

export default UserForm;