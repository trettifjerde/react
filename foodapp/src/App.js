import { Fragment } from "react";
import Header from './components/Layout/Header';
import './App.css';
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

const App = () => {
  console.log('App');
  return (
    <Fragment>
      <Header />
      <Meals />
      <Cart/>
    </Fragment>
  )
}

export default App;