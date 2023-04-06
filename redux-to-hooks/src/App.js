import React from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from './components/Nav/Navigation';

const App = props => {
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default App;
