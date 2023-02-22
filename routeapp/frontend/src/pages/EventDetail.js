import { json, useRouteLoaderData, redirect, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';
import EventItem  from '../components/EventItem'; 
import { getAuthToken } from '../helpers/auth';

const EventDetailsPage = () => {
    const {event} = useRouteLoaderData('event-details');

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={event}>
                {loadedEvent => <EventItem event={loadedEvent} />}
            </Await>
        </Suspense>
    )
};

export default EventDetailsPage;

async function loadEvent(eventId) {
    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (!response.ok) throw json({message: 'Event details not found'}, {status: 500});

    const data = await response.json();
    return data.event;
}

export function loader({request, params}) {
    return defer({
        event: loadEvent(params.eventId)
    })
}

export async function deleteEventAction({request, params}) {
    const response = await fetch('http://localhost:8080/events/' + params.eventId, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });
    if (! response.ok) throw json({message: 'Failed to delete event'}, {status: 500});
    return redirect('/events');
}