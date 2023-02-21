import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

function EventsPage() {
    const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events} >
        { loadedEvents => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents () {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) 
      throw json({message: 'Failed to load events'}, {status: 500});

    const resData = await response.json();
    return resData.events;

}

export default EventsPage;

export function loader() {
  return defer({
    events: loadEvents()
  })
}