import { ComponentPropsWithoutRef, forwardRef } from "react"

type InputProps = ComponentPropsWithoutRef<'input'> & {
    label: string;
    id: string;
}

/* 
    another solution I've come across
    while working on Mono test project:

    type InputProps2 = InputHTMLAttributes<HTMLInputElement> & {
        label: string;
        id: string;
    }
*/


const Input = forwardRef<HTMLInputElement, InputProps>(
    ({label, id, ...props}, ref) => {
    return <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} ref={ref} {...props}/>
    </p>
});

export default Input;