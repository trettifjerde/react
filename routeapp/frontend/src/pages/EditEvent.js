import { Suspense } from "react";
import { useRouteLoaderData, Await } from "react-router-dom";
import EventForm from '../components/EventForm';

const EditEventPage = () => {
    const {event} = useRouteLoaderData('event-details');
    
    return (    
    <Suspense>
        <Await resolve={event}>
            {loadedEvent =>   <EventForm method="patch" event={loadedEvent} />}
        </Await>
    </Suspense>
    )

};
export default EditEventPage;