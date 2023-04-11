import React from 'react';
import { Todo } from '../models/todo';
import TodoComponent from './Todo';

const Todos: React.FC<{items: Todo[]}> = (props) => {
    return (
        <ul>
            {props.items.map(item => <TodoComponent key={item.id} text={item.text} />)}
        </ul>
    )
}
export default Todos;