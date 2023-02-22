import { useNavigate, Form, useNavigation, useActionData, json, redirect } from 'react-router-dom';
import { getAuthToken } from '../helpers/auth';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      { actionData && actionData.errors && <ul>
          {Object.values(actionData.errors).map(error => <li key={error}>{ error }</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event.title}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event.image} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event.date}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event.description}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function formSubmitAction({request, params}) {
  const form = await request.formData();
  const url = request.method === 'POST' ? 'http://localhost:8080/events' : 'http://localhost:8080/events/' + params.eventId;

  const data = {
      title: form.get('title'),
      date: form.get('date'),
      description: form.get('description'),
      image: form.get('image'),
  };
  
  const response = await fetch(url, {
      method: request.method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      }
  });

  if (response.status === 422) 
    return response;

  if (!response.ok) throw json({message: 'Failed to handle event data'}, {status: 500});

  return redirect('/events');
}
