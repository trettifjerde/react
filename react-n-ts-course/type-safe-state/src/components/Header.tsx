import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/timers-context.tsx';

export default function Header() {

  const context = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={context.isRunning ? context.stopTimers : context.startTimers}>
        {context.isRunning ? 'Stop' : 'Start'} Timers
       </Button>
    </header>
  );
}
