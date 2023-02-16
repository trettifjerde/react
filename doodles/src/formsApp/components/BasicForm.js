import { useCallback, useState } from 'react';
import Input from './Input';
import { nameConfig, emailConfig } from './validators';

const firstNameConfig = {...nameConfig, label: 'First Name', id: 'firstName'};
const lastNameConfig = {...nameConfig, label: 'Last Name', id: 'lastName'};

const BasicForm = () => {
  console.log('Basic Form');

  const [isFirstNameValid, setFirstNameValid] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid;

  const handleFirstNameValidity = useCallback((v) => setFirstNameValid(v), [setFirstNameValid]);
  const handleLastNameValidity = useCallback((v) => setLastNameValid(v), [setLastNameValid]);
  const handleEmailValidity = useCallback((v) => setEmailValid(v), [setEmailValid]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) 
      console.log('Form is valid!');
    else {
      console.log('Form is invalid');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='control-group'>
        <Input config={firstNameConfig} updateValidity={handleFirstNameValidity}/>
        <Input config={lastNameConfig} updateValidity={handleLastNameValidity}/>
        <Input config={emailConfig} updateValidity={handleEmailValidity}/>
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
