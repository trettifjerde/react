import useFetch from '../../hooks/use-fetch';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [isLoading, error, sendRequest] = useFetch();
  const {onAddTask} = props;

  const enterTaskHandler = (taskText) => {
    sendRequest({
      url: 'https://academind34-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', 
      method: 'POST', 
      body: {text: taskText},
      callback: (res) => onAddTask({id: res.name, text: taskText})
    })
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
