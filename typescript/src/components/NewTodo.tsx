import React, { useRef, useContext } from 'react';
import classes from './NewTodo.module.css';
import { SchemeContext } from '../context/context';

const NewTodo : React.FC<{onAddTodo: (a: string) => void}> = React.memo((props) => {

    const context = useContext(SchemeContext);
    const todoRef = useRef<HTMLInputElement>(null);

    const submitTodo = (event: React.FormEvent) => {
        event.preventDefault();
        
        const enteredText = todoRef.current!.value;

        if (! enteredText.trim()) return;

        props.onAddTodo(enteredText.trim());

        todoRef.current!.value = '';
    }
    return <form className={`${classes.form} ${classes[context.scheme]}`} onSubmit={submitTodo}>
        <label>Task: 
            <input type="text" ref={todoRef} />
        </label>
        <button type="submit">Submit</button>
    </form>
})
export default NewTodo;