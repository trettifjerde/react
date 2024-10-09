import { useParams } from 'react-router-dom';

import { SESSIONS } from '../dummy-sessions.ts';
import Modal from '../components/Modal.tsx';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { ModalRef, Session } from '../util/types.ts';
import Input from '../components/Input.tsx';
import Button from '../components/Button.tsx';
import { useStoreContext } from '../store/context.tsx';

export default function SessionPage() {
  const params = useParams<{ id: string }>();

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  const { checkIfSessionBooked } = useStoreContext();
  const isSessionBooked = checkIfSessionBooked(loadedSession.id);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main id="session-page">
      <article>
        <header>
          <img
            src={loadedSession.image}
            alt={loadedSession.title}
          />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <p>
              {isSessionBooked && <Button disabled>Session is booked</Button>}
              {!isSessionBooked && <Button onClick={() => setModalOpen(true)}>Book Session</Button>}
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>

      {isModalOpen && <BookSessionModal 
        session={loadedSession} 
        closeModal={() => setModalOpen(false)}  
      />}

    </main>
  );
}

function BookSessionModal({session, closeModal} : {session: Session, closeModal: () => void}) {
  const modalRef = useRef<ModalRef>(null);
  const {addSession} = useStoreContext();

  const openModal = () => modalRef.current?.open();

  const bookSession: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget)) as { name: string, email: string };
    console.log(data);

    addSession(session);
    closeModal();
  }

  useEffect(() => {
    openModal();
  }, []);

  return <Modal ref={modalRef} closeModal={closeModal}>
    <h2>Book Session</h2>
    <form onSubmit={bookSession}>
      <Input label="Your name" type="text" id="name" />
      <Input label="Your email" type="email" id="email" />

      <div className='actions'>
        <Button textOnly type="button" onClick={closeModal}>Cancel</Button>
        <Button>Book session</Button>
      </div>
    </form>
  </Modal>
}
