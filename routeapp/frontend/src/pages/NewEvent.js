import { Fragment } from "react";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
    return (
        <Fragment>
            <h1>New Event Page</h1>
            <EventForm method="post" event={{}}/>
        </Fragment>
    )
};
export default NewEventPage;