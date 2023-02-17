import { useCallback, useState } from "react";

const useInput = (validators) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const isValid = validators.reduce((acc, validate) => (acc && validate(value)), true);
    const showError = touched && !isValid;

    console.log(value, touched, isValid, showError);

    const handleBlur = useCallback(() => setTouched(true), []);
    const handleChange = useCallback(event => setValue(event.target.value), []);
    const resetValue = useCallback(() => {
        setTouched(false);
        setValue('');
    }, []);

    return [value, isValid, showError, handleBlur, handleChange, resetValue];
}

export default useInput;