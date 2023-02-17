import classes from './FormInput.module.css';

const FormInput = (props) => {
    return (
        <div className={`${classes['form-control']} ${props.showError ? classes['invalid'] : ''}`}>
            <label htmlFor={props.config.id}>{props.config.label}</label>
            <input className="input" type={props.config.type} id={props.config.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
            <span className={classes['error-text']}>{props.config.errorMessages.join('. ')}</span>
        </div>
    )
}

export default FormInput;