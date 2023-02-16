import { useState } from "react";

const SimpleInput = () => {

  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const isEnteredValueInvalid = !enteredValue.trim();
  const isFormInputInvalid = isTouched && isEnteredValueInvalid;

  const containerClassname = isFormInputInvalid ? 'form-control invalid' : 'form-control';

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsTouched(true);

    if (isEnteredValueInvalid) {
      return;
    }

    console.log(enteredValue);
    setEnteredValue('');
    setIsTouched(false);
  }

  const handleOnBlur = () => setIsTouched(true);

  const handleOnChange = (event) => setEnteredValue(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <div className={containerClassname}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredValue} onBlur={handleOnBlur} onChange={handleOnChange}/>
        <span className='error-text'>Name must not be empty</span>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
