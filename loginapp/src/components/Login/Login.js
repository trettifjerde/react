import React, { useState, useEffect, useReducer, useContext } from 'react';
///import { useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

const USER_INPUT = 'USER_INPUT';
const FOCUS = 'FOCUS';

const validateEmail = (email) => {
  return email.trim().includes('@');
}

const validatePassword = (password) => {
  return password.trim().length > 5;
}

const emailReducer = (state, action) => {
  switch(action.type) {
    case USER_INPUT:
      return {value: action.payload, isValid: validateEmail(action.payload), toFocus: false};
    case FOCUS:
        return {...state, toFocus: true};
    default:
      return state;
  }
};

const passwordReducer = (state, action) => {
  switch(action.type) {
    case USER_INPUT:
      return {value: action.payload, isValid: validatePassword(action.payload), toFocus: false}
    case FOCUS:
      return {...state, toFocus: true}
    default:
      return state;
  }
}

const Login = () => {
  const context = useContext(AuthContext);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null, toFocus: false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null, toFocus: false});
  const [formIsValid, setFormIsValid] = useState(false);

  const {isValid: isEmailValid} = emailState;
  const {isValid: isPasswordValid} = passwordState;

  //const emailInputRef = useRef();
  //const passwordInputRef = useRef();

  useEffect(() => {
    const debouncer = setTimeout(() => setFormIsValid(isEmailValid && isPasswordValid), 300);
    return () => clearTimeout(debouncer);
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: USER_INPUT, payload: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: USER_INPUT, payload: event.target.value});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      context.onLogin(emailState.value.trim(), emailState.value.trim());
    }
    else if (!isEmailValid) {
      dispatchEmail({type: FOCUS});
      //emailInputRef.current.focus();
    }
    else {
      dispatchPassword({type: FOCUS});
      //passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          //ref={emailInputRef}
          type="email" id="email" label="E-Mail" 
          value={emailState.value} isValid={isEmailValid} 
          onChange={emailChangeHandler} toFocus={emailState.toFocus}/>
        <Input 
          //ref={passwordInputRef}
          type="password" id="password" label="Password" 
          value={passwordState.value} isValid={passwordState.isValid} 
          onChange={passwordChangeHandler} toFocus={passwordState.toFocus}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
