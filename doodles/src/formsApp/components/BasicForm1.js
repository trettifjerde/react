import Input from './Input';
import { nameConfig, emailConfig } from './validators';
import useInput from './useInput';

const firstNameConfig = {...nameConfig, label: 'First Name', id: 'firstName'};
const lastNameConfig = {...nameConfig, label: 'Last Name', id: 'lastName'};

const BasicForm = () => {
  console.log('Basic Form');

  const [firstNameValue, isFirstNameValueValid, showFirstNameErrors, handleFirstNameBlur, handleFirstNameChange, resetFirstNameValue] = useInput(nameConfig.validate);
  const [lastNameValue, isLastNameValueValid, showLastNameErrors, handleLastNameBlur, handleLastNameChange, resetLastNameValue] = useInput(nameConfig.validate);
  const [emailValue, isEmailValueValid, showEmailErrors, handleEmailBlur, handleEmailChange, resetEmailValue] = useInput(emailConfig.validate);

  const isFormValid = isFirstNameValueValid && isLastNameValueValid && isEmailValueValid;


  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      const formValue = {};
      formValue[firstNameConfig.id] = firstNameValue;
      formValue[lastNameConfig.id] = lastNameValue;
      formValue[emailConfig.id] = emailValue;
      console.log(formValue);
      resetFirstNameValue();
      resetLastNameValue();
      resetEmailValue();
    }
    else {
      console.log('Form is invalid');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='control-group'>
        <Input config={firstNameConfig} value={firstNameValue} showErrors={showFirstNameErrors}
            handleBlur={handleFirstNameBlur} handleChange={handleFirstNameChange} />
        <Input config={lastNameConfig} value={lastNameValue} showErrors={showLastNameErrors}
            handleBlur={handleLastNameBlur} handleChange={handleLastNameChange} />
        <Input config={emailConfig} value={emailValue} showErrors={showEmailErrors}
            handleBlur={handleEmailBlur} handleChange={handleEmailChange} />
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
