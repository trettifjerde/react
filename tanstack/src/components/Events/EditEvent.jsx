import { Link, redirect, useNavigate, useParams, useSubmit, useNavigation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();

  const { data, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({signal}) => fetchEvent({signal, id}),
    staleTime: 5000
  })

  /*const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      await queryClient.cancelQueries({queryKey: ['events', id]});
      const previousEvent = queryClient.getQueryData(['events', id]);
      queryClient.setQueryData(['events', id], data.event);

      return { previousEvent }
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', id]);
    }
  })

  function handleSubmit(formData) {
    mutate({id, event: formData});
    navigate('../');
  }*/

  function handleSubmit(formData) {
    submit(formData, {method: 'PUT'});
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>

      {isError && <>
        <div className='center'><ErrorBlock title="Failed to fetch event data" message={error.info?.message} /></div>
        <button className='button' onClick={() => navigate('../')}>Back</button>
      </>}

      {data && <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' && <p>Sending data...</p>}
        {state !== 'submitting' && <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        }
        </EventForm>
      }
    </Modal>
  );
}

export function loader({params}) {
  const id = params.id;
  return queryClient.fetchQuery({
    queryKey: ['events', id],
    queryFn: ({signal}) => fetchEvent({signal, id}),
    staleTime: 5000
  });
}

export async function action({request, params}) {
  const formData = await request.formData();
  const updatedFormData = Object.fromEntries(formData);
  await updateEvent({id: params.id, event: updatedFormData});
  // not performing optimistic update anymore
  await queryClient.invalidateQueries(['events']);
  return redirect('../');
}