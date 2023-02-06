import { Fragment, useContext } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';


function App() {
  const context = useContext(AuthContext);

  return (
    <Fragment>
      <MainHeader onLogout={context.logoutHandler} />
      <main>
        {!context.isLoggedIn && <Login onLogin={context.onLogin} />}
        {context.isLoggedIn && <Home onLogout={context.onLogout} />}
      </main>
    </Fragment>
  );
}

export default App;
