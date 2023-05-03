import classes from './MeetupDetails.module.css';
import { MeetUp } from "../../util/types";

const MeetUpDetailsComponent: React.FC<{meetup: MeetUp}> = ({meetup}) => {
    return <section className={classes.detail}>
        <img src={meetup.image} />
        <h1>{meetup.title}</h1>
        <p>{meetup.description}</p>
        <address>{meetup.address}</address>
    </section>
}

export default MeetUpDetailsComponent;