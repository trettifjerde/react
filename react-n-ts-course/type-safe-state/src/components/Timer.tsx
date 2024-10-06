import Container from './UI/Container.tsx';
import { Timer as T, useTimersContext } from '../store/timers-context.tsx';
import { useEffect, useRef, useState } from 'react';

export default function Timer({ name, duration }: T) {

  const { isRunning } = useTimersContext();
  const timer = useRef<any>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const formattedTime = (remainingTime / 1000).toFixed(2);

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(
        () => setRemainingTime(prev => {
          const newTime = prev - 50;

          if (newTime <= 0) {
            clearInterval(timer.current);
            return 0;
          }
          return newTime;
        }),
        50)
    }

    return () => clearInterval(timer.current);

  }, [isRunning]);
  
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={remainingTime} /></p>
      <p>{formattedTime}</p>
    </Container>
  );
}
