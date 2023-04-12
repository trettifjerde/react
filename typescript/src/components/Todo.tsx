import React from 'react';
import classes from './Todo.module.css';
import { Todo } from '../models/todo';

const TodoComponent: React.FC<{item: Todo, onRemove: (id: number) => void}> = React.memo((props) => {
    return <li className={classes.item} onClick={props.onRemove.bind(null, props.item.id)}>{props.item.text}</li>
});

export default TodoComponent;