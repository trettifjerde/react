import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<'input'> & {
    label: string,
    id: string
};

export default function Input({label, id, ...props}: InputProps) {
    return <div className="control">
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props} />
    </div>
}