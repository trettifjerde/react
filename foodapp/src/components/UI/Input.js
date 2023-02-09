import './Input.css';
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {

    return (
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label>
            <input ref={ref} className={props.className} {...props.input} />
        </div>
    )
});
export default Input;