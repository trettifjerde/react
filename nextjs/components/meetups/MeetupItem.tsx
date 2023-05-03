import { useCallback } from 'react';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { useRouter } from 'next/router';

const MeetupItem: React.FC<{image: string, title: string, address: string, id: string}> = ({title, image, address, id}) => {

  const router = useRouter();
  const showDetailsHandler = useCallback(() => {
    router.push('/' + id);
  }, [router]);

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
