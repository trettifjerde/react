import React, {useContext} from 'react';
import { Todo } from '../models/todo';
import TodoComponent from './Todo';
import classes from './Todos.module.css';
import { SchemeContext } from '../context/context';

const Todos: React.FC<{items: Todo[], onRemove: (id: number) => void}> = (props) => {
    const context = useContext(SchemeContext);
    return (
        <ul className={`${classes.todos} ${classes[context.scheme]}`}>
            {props.items.map(item => <TodoComponent key={item.id} item={item} onRemove={props.onRemove}/>)}
        </ul>
    )
}
export default Todos;