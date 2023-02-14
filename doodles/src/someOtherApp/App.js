import { Fragment, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

function convertDatabaseDataToTasks(res) {
  return Object.entries(res).map(([id, task]) => ({id: id, ...task}));
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, error, sendRequest] = useFetch();

  useEffect(() => { 
    sendRequest({
      url: 'https://academind34-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', 
      method: 'GET', 
      callback: (res) => setTasks(convertDatabaseDataToTasks(res))
    }) 
  }, [sendRequest]);

  const taskAddHandler = (task) => setTasks((prevState) => ([...prevState, task]));

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
      />
    </Fragment>
  );
}

export default App;
