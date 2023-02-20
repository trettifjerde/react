import { Fragment } from "react";
import { Link } from "react-router-dom";

const events = ['event1', 'event2', 'event3'];

const EventsPage = () => {
    return (
        <Fragment>
            <h1>Events Page</h1>
            <ul>
                { events.map((e, i) => <li key={i}><Link to={`${e}`}>{e}</Link></li>)}
            </ul>
        </Fragment>
    )
};
export default EventsPage;