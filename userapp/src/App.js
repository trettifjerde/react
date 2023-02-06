import { Fragment, useState } from 'react';
import NewUser from './components/NewUser/NewUser';
import Users from './components/User/Users';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const createNewUser = (data) => {
    setUsers((prevUsers) => {
      return [...prevUsers, {...data, id: prevUsers.length + 1}];
    });
  }
  return (
    <Fragment>
      <NewUser onSaveUser={createNewUser}/>
      <Users users={users} />
    </Fragment>
  );
}

export default App;
