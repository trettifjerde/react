import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { postEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      navigate('/events');
      queryClient.invalidateQueries({queryKey: ['events']});
    }
  })

  function handleSubmit(formData) {
    mutate({event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      {isError && <ErrorBlock title="Failed to create event" message={error.info?.message || 'Please check your inputs and try again'}/>}
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Is sumbitting...'}
        {!isPending && <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>}
      </EventForm>
    </Modal>
  );
}