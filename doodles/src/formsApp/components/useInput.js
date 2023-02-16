import { useCallback, useState } from "react";

const useInput = (validate) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const isValueValid = validate(value);
  const showErrors = ! isValueValid && isTouched;
  console.log(value, isTouched, isValueValid, showErrors);

  const handleBlur = useCallback(() => setIsTouched(true), []);
  const handleChange = useCallback((event) => setValue(event.target.value), []);
  const resetValue = useCallback(() => {
    setValue('');
    setIsTouched(false);
  }, []);

  return [value, isValueValid, showErrors, handleBlur, handleChange, resetValue];
};

export default useInput;
