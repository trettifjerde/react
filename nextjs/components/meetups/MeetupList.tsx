import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import { MeetUp } from '../../util/types';

const MeetupList: React.FC<{meetups: MeetUp[]}> = ({meetups}) => {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
