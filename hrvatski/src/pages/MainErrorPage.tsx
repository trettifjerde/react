import { Fragment } from 'react';
import NavigationHeader from '../ui/NavigationHeader';
import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorPage = () => {
  return (
    <Fragment>
      <NavigationHeader />
      <Main>
        Page is not found
      </Main>
    </Fragment>
  )
}

export default ErrorPage;
