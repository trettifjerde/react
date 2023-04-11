import './App.css';
import Todos from './components/Todos';
import { Todo } from './models/todo';

function App() {

  const items = [new Todo('Learn React'), new Todo('Learn Typescript')];
  return (
    <div >
        <Todos items={items} />
    </div>
  );
}

export default App;
