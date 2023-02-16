import { useCallback, memo } from "react";

const Input = (props) => {
    const containerClassname = props.showErrors ? 'form-control invalid' : 'form-control';
    const { handleChange, handleBlur } = props;
    console.log(props.config.label);

    const onHandleBlur = useCallback(() => handleBlur(), [handleBlur]);
    const onHandleChange = useCallback((event) => handleChange(event), [handleChange]);

    return (
        <div className={containerClassname}>
          <label htmlFor={props.config.id}>{props.config.label}</label>
          <input type={props.config.type} id={props.config.id} value={props.value} onBlur={onHandleBlur} onChange={onHandleChange}/>
          <span className='error-text'>{props.config.errorMessage}</span>
        </div>
    );
}

export default memo(Input);