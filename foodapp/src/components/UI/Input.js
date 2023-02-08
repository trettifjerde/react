import './Input.css';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const Input = forwardRef((props, ref) => {
    const inputRef = useRef();
    const getValue = () => +inputRef.current.value;

    useImperativeHandle(ref, () => ({getValue: getValue}));

    return (
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label>
            <input ref={inputRef} {...props.input} />
        </div>
    )
});
export default Input;