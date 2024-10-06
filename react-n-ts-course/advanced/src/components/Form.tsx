import { ComponentPropsWithoutRef, FormEvent, forwardRef, useImperativeHandle, useRef } from "react"

type FormProps = ComponentPropsWithoutRef<'form'> & {
    onSave: (data: unknown) => void
};

export type FormHandle = {
    clear: () => void
}

const Form = forwardRef<FormHandle, FormProps>(function F({children, onSave, ...props}, ref) {
    
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => {
        return {
            clear() {
                formRef.current?.reset();
            }
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        onSave(data);
    }
    
    return <form ref={formRef} onSubmit={handleSubmit} {...props}>
        {children}
    </form>
});

export default Form;