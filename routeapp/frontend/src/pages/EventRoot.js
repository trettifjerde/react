import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

const EventRoot = () => {
    return (
        <Fragment>
            <EventsNavigation />
            <section>
                <Outlet />
            </section>
        </Fragment>
    )
}
export default EventRoot;