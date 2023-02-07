import { Fragment, useEffect, useReducer } from 'react';
import StartFrame from './components/frames/StartFrame';
import PollFrame from './components/frames/PollFrame';
import ResultFrame from './components/frames/ResultFrame';

import { calculateResult, prepareLastQuestion, getResult } from './data/data';
import { actions, initialState, stateReducer } from './state/test-state';

import './App.css';

const maxQLength = 5;

function App() {
  const [state, dispatchState] = useReducer(stateReducer, initialState);
  const {questions, isRunning, selectedOptions, result, extraQuestion} = state;
  const qI = selectedOptions.length;

  const startTest = () => dispatchState({type: actions.START, payload: maxQLength});
  const selectOption = (optionId) => dispatchState({type: actions.SELECT_OPTION, payload: optionId});
  const selectFinalOption = (optionId) => dispatchState({type: actions.SET_RESULT, payload: getResult(optionId)});
  const unselect = () => dispatchState({type: actions.UNSELECT});


  useEffect(() => {
    if (selectedOptions.length === maxQLength) {
      const res = calculateResult(selectedOptions);

      if (res.isComplete) {
        dispatchState({
          type: actions.SET_RESULT, 
          payload: getResult(res.result)
        });
      }
      else {
        dispatchState({
          type: actions.ADD_EXTRA_QUESTION, 
          payload: prepareLastQuestion(questions, res.result)
        });
      }
    }
  }, [selectedOptions, questions])

  return (
    <Fragment>
      { !isRunning && !result && <StartFrame startTest={startTest}/> }
      { isRunning && !result && !extraQuestion && (
        <PollFrame 
        qNum={qI + 1} 
        qLength={maxQLength} 
        question={questions[qI]} 
        selectOption={selectOption} 
        unselect={unselect}
      />) }
      { isRunning && !result && extraQuestion && (
      <PollFrame 
        qNum={qI + 1}
        qLength={maxQLength} 
        question={extraQuestion} 
        selectOption={selectFinalOption} 
        unselect={unselect}
      />
      )}
      { result && (<ResultFrame result={result} startTest={startTest} />)}
    </Fragment>
  );
}

export default App;
