import { Link } from "react-router-dom";
import Button from "./Button";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import { ModalRef, Session } from "../util/types";
import { useStoreContext } from "../store/context";
import UpcomingSession from "./UpcomingSession";

export default function Header() {

    const { state } = useStoreContext();
    const [isModalOpen, setModalOpen] = useState(false);

    return <header id="main-header">
        <h1>React Mentoring</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/">Our Mission</Link>
                </li>
                <li>
                    <Link to="/sessions">Browse Sessions</Link>
                </li>
                <li>
                    <Button textOnly={false} onClick={() => setModalOpen(true)}>
                        Upcoming events
                    </Button>
                </li>
            </ul>
        </nav>
        {isModalOpen && <UpcomingEventsModal 
            sessions={state.sessions}
            closeModal={() => setModalOpen(false)} 
        />}
    </header>
}

function UpcomingEventsModal({ sessions, closeModal }: { sessions: Session[], closeModal: () => void }) {
    const modalRef = useRef<ModalRef>(null);

    useEffect(() => {
        modalRef.current?.open();
    }, [])

    return <Modal ref={modalRef} closeModal={closeModal}>
        <h2>Upcomming events</h2>
        {!sessions.length && <p>You've got no upcoming events yet</p>}
        {sessions.map(s => <UpcomingSession key={s.id} session={s} />)}
    </Modal>
}