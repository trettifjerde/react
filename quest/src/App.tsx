import { useState, useRef, useEffect } from 'react';
import styles from './App.module.scss';
import { AppState, Task } from './util/types';
import { TASKS } from './util/data';

const CAT = 'assets/cel_cat.jpg';
const CAKE = 'assets/cake.jpg';

function App() {

  const [state, setState] = useState<AppState>('preload');
  const [i, setI] = useState(0);
  const [task, setTask] = useState<Task>();
  const [isError, setIsError] = useState(false);
  const answerRef = useRef<HTMLInputElement>(null);

  const launch = () => {
    setState('start');
    document.querySelector('audio')!.play();
  };

  const getContainerStyle = () => {    
    switch(state) {
    case 'preload':
      return `${styles.content} ${styles.preload}`;
    default: 
      return `${styles.container}`;
  }};

  const startQuest = () => setState('start-next');

  const initTasks = (n: number) => {
    setI(n);
    setTask(TASKS[n]);
    setState('current');
    loadNextImage();
  };

  const checkAnswer = () => {
    if (answerRef.current) {
      const answer = answerRef.current.value.trim().toLowerCase();

      if (task?.solution.some(v => v.toLowerCase() === answer))
        setState('next');
      else
          setIsError(true);
    }
  }

  const setNextTask = () => {
    setI(prev => prev + 1);
    setTask(TASKS[i + 1]);
    setIsError(false);
    setState('current');
    localStorage.setItem('n', (i + 1).toString());

    if (answerRef.current) {
      answerRef.current.value = '';
    }
    loadNextImage();
  }

  const clearError = () => setIsError(false);

  const congratulate = () => {
    setState('end');
    document.querySelector('audio')?.play();
  };

  const giveReward = () => setState('reward');

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

  const onAnimationEnd = () => {
    switch(state) {
      case 'start-next':
        initTasks(0);
        localStorage.setItem('n', '0');
        break;
      case 'next':
        if (i < TASKS.length - 1)
          setNextTask();
        else {
          congratulate();
          localStorage.setItem('n', 'complete');
        }
        break;
      case 'end':
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
  }, [])
  

  return <div className={styles.container}>
    <audio src="assets/cat.mp3" preload="auto"></audio>
    <div className={styles.confetti}></div>
    <div className={styles.fireworks}></div>
    <div className={getContainerStyle()}>
        {state === 'preload' && <div>
            <button onClick={launch}>Начать</button>
        </div>}

        {(state === 'start' || state === 'start-next') && <div>
            <h1>С днем рождения, Кисык!</h1>
            <h1>🎉🎉🎉</h1>
            <p className={styles.cont}>Вы готовы начать свой праздничный квесцик?</p>
            <button type="button" onClick={startQuest}>Погнали!</button>
        </div>}

        {(state === 'current' || state === 'next') && <div>
            <h3>{i + 1}/{TASKS.length}</h3>
            <img src={task?.pic} />
            <h2>{task?.task}</h2>
            <form autoComplete='off' onSubmit={checkAnswer}>
                <p className={styles['error-text']}>{isError && 'Ниц. Подумойте ещё :<'}</p>
                <input ref={answerRef} type="text" placeholder="Ваш ответ" name="answer" required onFocus={clearError} onChange={clearError}/>
                <button type="submit">Проверить</button>
            </form>
        </div>}

        {state === 'end' && <div>
            <h1>Поздравляем!</h1>
            <p>Вы самый гениальный кисик на свете!</p>
            <img src="assets/cel_cat.jpg" />
        </div>}

        {state === 'reward' && <div>
            <h1>Бегице гюшац!</h1>
            <p>Ещё раз с днем рождения! 🍰🍰🍰</p>
            <img src="assets/cake.jpg" />
        </div>}
    </div>
  </div>
}

export default App;
