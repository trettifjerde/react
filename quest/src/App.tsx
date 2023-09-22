import { useState, useRef, useEffect, useReducer, FormEventHandler } from 'react';
import { AnimationDefinition, motion, useAnimationControls } from 'framer-motion';
import styles from './App.module.scss';
import { TASKS } from './util/data';
import { animations } from './util/animations';
import { appReducer, initializer } from './util/reducer';
import * as actions from './util/actions';

const CAT = '/cel_cat.jpg';
const CAKE = '/cake.jpg';

function App() {

  const [state, dispatch] = useReducer(appReducer, null, initializer);
  const {name: stateName, i, task} = state;
  const [isError, setIsError] = useState(false);
  const answerRef = useRef<HTMLInputElement>(null);
  const contentControls = useAnimationControls();
  const confettiControls = useAnimationControls();
  const fireworksControls = useAnimationControls();

  const launch = () => {
    dispatch(new actions.StartGreet());
    document.querySelector('audio')!.play();
  };

  const getContainerStyle = () => {    
    switch(stateName) {
    case 'launcher':
      return `${styles.content} ${styles.preload}`;
    default: 
      return `${styles.content}`;
  }};

  const endGreet = () => dispatch(new actions.EndGreet());

  const initTasks = (n: number) => {
    dispatch(new actions.StartTask(n));
    loadNextImage();
  };

  const checkAnswer: FormEventHandler = (e) => {
    e.preventDefault();
    if (answerRef.current) {
      const answer = answerRef.current.value.trim().toLowerCase();

      if (task?.solution.some(v => v.toLowerCase() === answer))
        dispatch(new actions.EndTask())
      else
          setIsError(true);
    }
  }

  const setNextTask = () => {
    dispatch(new actions.StartTask(i + 1));
    setIsError(false);
    localStorage.setItem('n', (i + 1).toString());

    if (answerRef.current) {
      answerRef.current.value = '';
    }

    loadNextImage();
  }

  const clearError = () => setIsError(false);

  const congratulate = () => {
    dispatch(new actions.Congratulate());
    document.querySelector('audio')?.play();
    localStorage.setItem('n', 'complete');
  };

  const giveReward = () => dispatch(new actions.GiveReward());

  const loadNextImage = () => {
    const n = i + 1;
    if (n < TASKS.length) {
      const image = new Image();
      image.src = TASKS[n].pic;
    }
    else {
      const cat = new Image();
      const cake = new Image();
      cat.src = CAT;
      cake.src = CAKE;
    }
  }

  const onAnimationEnd = (def: AnimationDefinition) => {
    switch(def) {
      case 'greeting-exit':
        initTasks(0);
        localStorage.setItem('n', '0');
        break;
      case 'task-exit':
        if (i < TASKS.length - 1)
          setNextTask();
        else 
          congratulate();
        break;
      case 'congrats-end':
        giveReward();
    }
  }

  useEffect(() => {
    const n = localStorage.getItem('n');

    if (n === 'complete') 
      congratulate();
    else if (n)
      initTasks(+n);
    else {
      const image = new Image();
      image.src = TASKS[0].pic;
    }
  }, []);

  useEffect(() => {

    async function greet() {
      await contentControls.start('greeting-enter1');
      await contentControls.start('greeting-enter2');
      await contentControls.start('greeting-enter3');
      await contentControls.start('greeting-enter4');
      await contentControls.start('greeting-enter5');
      confettiControls.set({visibility: 'visible'});
      await confettiControls.start('visible');
      confettiControls.set({visibility: 'hidden'});
    }

    async function acceptAnswer() {
      confettiControls.set({visibility: 'visible', opacity: 0});
      await confettiControls.start('visible');
      confettiControls.set({visibility: 'hidden'});
      contentControls.start('task-exit');
    }

    async function celebrate() {
      fireworksControls.set({visibility: 'visible', opacity: 0});
      fireworksControls.start('visible');
      contentControls.set({x: 0});
      await contentControls.start('congrats-show');
      for (let i = 0; i < 5; i++) {
        await contentControls.start('congrats-animate');
      }
      await contentControls.start('congrats-end');
      fireworksControls.set({visibility: 'hidden'});
    }

    switch (stateName) {
      case 'greeting-enter':
        greet();
        break;
      case 'task-exit':
        acceptAnswer();
        break;
      case 'congrats':
        celebrate();
        break;
      default:
        contentControls.start(stateName);
    }
  }, [stateName]);

  return <div className={styles.container}>
    <audio src="/cat.mp3" preload="auto"></audio>
    <motion.div className={styles.confetti} animate={confettiControls} variants={animations.confetti}></motion.div>
    <motion.div className={styles.fireworks} animate={fireworksControls} variants={animations.fireworks}></motion.div>
    <motion.div className={getContainerStyle()} animate={contentControls} variants={animations.content} onAnimationComplete={onAnimationEnd}>
        {stateName === 'launcher' && <div>
            <button onClick={launch}>Начать</button>
        </div>}

        {(stateName === 'greeting-enter' || stateName === 'greeting-exit') && <div>
            <h1>С днем рождения, Кисык!</h1>
            <h1>🎉🎉🎉</h1>
            <p className={styles.cont}>Вы готовы начать свой праздничный квесцик?</p>
            <button type="button" onClick={endGreet}>Погнали!</button>
        </div>}

        {(stateName === 'task-enter' || stateName === 'task-exit') && <div>
            <h3>{i + 1}/{TASKS.length}</h3>
            <img src={task?.pic} />
            <h2>{task?.task}</h2>
            <form autoComplete='off' onSubmit={checkAnswer}>
                <p className={styles['error-text']}>{isError && 'Ниц. Подумойте ещё :<'}</p>
                <motion.input ref={answerRef} type="text" placeholder="Ваш ответ" name="answer" required 
                  onFocus={clearError} onChange={clearError}
                  animate={isError ? animations.input : ''}
                  />
                <button type="submit">Проверить</button>
            </form>
        </div>}

        {stateName === 'congrats' && <div>
            <h1>Поздравляем!</h1>
            <p>Вы самый гениальный кисик на свете!</p>
            <img src="/cel_cat.jpg" />
        </div>}

        {stateName === 'reward' && <div>
            <h1>Бегице гюшац!</h1>
            <p>Ещё раз с днем рождения! 🍰🍰🍰</p>
            <img src="/cake.jpg" />
        </div>}
    </motion.div>
  </div>
}

export default App;
