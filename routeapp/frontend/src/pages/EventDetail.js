import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

const EventDetailsPage = () => {
    const params = useParams();
    return (
        <Fragment>
            <h1>{`${params.eventId} Details Page`}</h1>
            <div>
                <p>Some info</p>
                <Link to="edit">Edit info</Link>
            </div>
        </Fragment>

    )
};
export default EventDetailsPage;