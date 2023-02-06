import { useState } from "react";
import Card from "../UI/Card";
import ErrorModal from "../UI/Modal";
import UserForm from "./UserForm";
import './NewUser.css';

function NewUser(props) {
    const [errors, setErrors] = useState({});
    const [isVisible, setVisible] = useState(false);
    const handleFormErrors = (errors) => {
        setErrors(errors);
        setVisible(Object.keys(errors).length > 0);
    };

    return (
        <Card>
            <UserForm onSaveUser={props.onSaveUser} onValidationError={handleFormErrors}/>
            <ErrorModal title={'Invalid form input'} hide={() => setVisible(false)} isVisible={isVisible}>
                <ul className="error-list">
                    {Object.entries(errors).map(([k, v]) => <li key={k}>{v}</li>)}
                </ul>
                
            </ErrorModal>
        </Card>
    )
}
export default NewUser;