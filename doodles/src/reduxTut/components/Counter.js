import { useSelector, useDispatch } from "react-redux";
/*import {actions} from '../store/store';*/
import { counterActions } from '../store/toolkitStore';
import classes from './Counter.module.css';
import { memo } from "react";

const Counter = () => {
    const state = useSelector(state => state.counter);
    const dispatch = useDispatch();
    console.log('Counter');

    /*const increment = () => {
        dispatch({type: actions.INCREMENT});
    }
    const decrement = () => {
        dispatch({type: actions.DECREMENT});
    }*/
    
    const increment = () => {
        dispatch(counterActions.increment());
    }
    const decrement = () => {
        dispatch(counterActions.decrement());
    }
    const increase = () => {
        dispatch(counterActions.increase(10));
    }
    const toggleVisibility = () => {
        dispatch(counterActions.toggleVisibility());
    }

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {state.visible && <div className={classes.value}>{state.counter}</div>}
            <div>
                <button onClick={increment}>Increment</button>
                <button onClick={increase}>Increase by 10</button>
                <button onClick={decrement}>Decrement</button>
            </div>
            <button onClick={toggleVisibility}>Toggle Counter</button>
        </main>

        
    )
}
export default memo(Counter);