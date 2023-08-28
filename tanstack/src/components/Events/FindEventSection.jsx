import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [query, setQuery] = useState('');

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['events', {query}],
    queryFn: ({signal}) => fetchEvents({signal, query}),
    enabled: !!query
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchElement.current) {
      setQuery(searchElement.current.value);
    }
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) 
    content = <LoadingIndicator />
  if (isError)
    content = <ErrorBlock title="" message={ error.info?.message || 'An error has occurred'} />

  if (data) {
    if(data.length > 0) {
      content = <ul className='event-list'>
        {data.map(event => <li key={event.id}><EventItem event={event} /></li>)}
      </ul>
    }
    else {
      content = <p>No events found</p>
    }
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button type='submit'>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
