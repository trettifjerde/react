import { useCallback, useContext, useState } from 'react';
import classes from './App.module.css';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import { Todo } from './models/todo';
import { SchemeContext } from './context/context';

function App() {

  const context = useContext(SchemeContext);

  const [items, setItems] = useState<Todo[]>([]);

  const onAddTodo = useCallback((todo: string) => {
    setItems((prev) => ([...prev, new Todo(todo)]))
  }, [setItems]);

  const onRemoveTodo = useCallback((id: number) => {
    setItems((prev) => (prev.filter(item => item.id !== id)))
  }, [setItems]);

  return (
    <div className={`${classes.app} ${classes[context.scheme]}`}>
        <button type="button" onClick={context.toggleScheme}>Change scheme</button>
        <NewTodo onAddTodo={onAddTodo} />
        <Todos items={items} onRemove={onRemoveTodo} />
    </div>
  );
}

export default App;
