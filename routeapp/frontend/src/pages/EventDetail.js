import { json, useRouteLoaderData, redirect } from 'react-router-dom';
import EventItem  from '../components/EventItem'; 

const EventDetailsPage = () => {
    const event = useRouteLoaderData('event-details');

    return <EventItem event={event} />;
};

export default EventDetailsPage;

export async function loader({request, params}) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (!response.ok) throw json({message: 'Event details not found'}, {status: 500});

    const data = await response.json();
    console.log(data);
    return data.event;
}

export async function deleteEventAction({request, params}) {
    const response = await fetch('http://localhost:8080/events/' + params.eventId, {
        method: request.method
    });
    if (! response.ok) throw json({message: 'Failed to delete event'}, {status: 500});
    return redirect('/events');
}