import { useRef } from 'react';
import './Input.css';

const Input = props => {
    const inputRef = useRef();

    if (props.toFocus) {
        inputRef.current.focus();
    }

    return (
        <div className={`control ${
            props.isValid === false ? 'invalid' : ''
          }`}>
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
    )
};

export default Input;

/*
import { useRef, useImperativeHandle, forwardRef } from 'react';
import './Input.css';

const Input = forwardRef((props, ref) => {
    const inputRef = useRef();

    //if (props.toFocus) {
    //    inputRef.current.focus();
    //}

    const activate = () => {
        inputRef.current.focus();
    }
 
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    });

    return (
        <div className={`control ${
            props.isValid === false ? 'invalid' : ''
          }`}>
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
    )
});

export default Input;
*/