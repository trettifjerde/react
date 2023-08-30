import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import {useMutation, useQuery } from '@tanstack/react-query';

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';
import { useState } from 'react';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', id],
    queryFn: ({signal}) => fetchEvent({id, signal}),
    staleTime: 5000
  });

  const {mutate, isPending: isDeletePending, isError: isDeleteError, error: deleteError} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      })
      navigate('/events')
    }
  })

  let dynamicContent;

  if (isPending) {
    dynamicContent = <div className='center'>Fetching data...</div>
  }

  if (isError) {
    dynamicContent = <div className='center'><ErrorBlock title="Failed to load event" message={error.info?.message || ''} /></div>
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  return (
    <>
      {isDeleting && <Modal onClose={handleStopDelete}>
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this event?</p>

        {isDeleteError && <ErrorBlock title="Failed to delete event" message={deleteError.info?.message || ''}/>}
        
        <div className='form-actions'>
          {isDeletePending && <p>Deleting...</p>}
          {!isDeletePending && <><button className='button-text' onClick={handleStopDelete}>Cancel</button>
          <button className='button' onClick={() => mutate({id})}>Delete</button>
          </>}
        </div>
      </Modal>}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {dynamicContent}
        {data && <><header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
        </>}
      </article>
    </>
  );
}
