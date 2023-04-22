import { Fragment } from 'react';
import NavigationHeader from './ui/NavigationHeader';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.main`
  max-width: 1200px;
  margin: auto;
  height: calc(100vh - 4rem);
  overflow: hidden;
`;

const App = () => {
  return (
    <Fragment>
      <NavigationHeader />
      <Main>
        <Outlet />
      </Main>
    </Fragment>
  )
}

export default App;
