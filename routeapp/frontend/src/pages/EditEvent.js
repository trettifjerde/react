import { useRouteLoaderData } from "react-router-dom";
import EventForm from '../components/EventForm';

const EditEventPage = () => {
    const event = useRouteLoaderData('event-details');
    
    return <EventForm method="patch" event={event} />;
};
export default EditEventPage;