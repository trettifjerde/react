import styles from './f.module.css';
import {useCallback, useRef, memo } from 'react';

const Form = memo(({onSubmit, onReset}) => {
    console.log('Form');
    const formRef = useRef();

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        let isFormValid = true;
        const data = {};

        for (const [key, v] of formData.entries()) {
            const value = v.toString();

            if (!value) {
                isFormValid = false;
                break;
            }

            data[key] = value;
        }

        if (isFormValid)
            onSubmit(data);
        else 
            console.log('Invalid form');
    }, [onSubmit]);

    const handleReset = useCallback((event) => {
        onReset();
    }, [onReset]);

    return <form className={styles.form} ref={formRef} onSubmit={handleSubmit} onReset={handleReset}>
        <div className={styles['input-group']}>
            <p>
                <label htmlFor="current-savings">Current Savings ($)</label>
                <input type="number" id="current-savings" name="current-savings" />
            </p>
            <p>
                <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                <input type="number" id="yearly-contribution" name="yearly-contribution" />
            </p>
            </div>
            <div className={styles['input-group']}>
            <p>
                <label htmlFor="expected-return">
                Expected Interest (%, per year)
                </label>
                <input type="number" id="expected-return" name="expected-return" />
            </p>
            <p>
                <label htmlFor="duration">Investment Duration (years)</label>
                <input type="number" id="duration" name="duration" />
            </p>
        </div>
        <p className={styles.actions}>
            <button type="reset" className={styles.buttonAlt}>Reset</button>
            <button type="submit" className={styles.button}>Calculate</button>
        </p>
  </form>
});

export default Form;
