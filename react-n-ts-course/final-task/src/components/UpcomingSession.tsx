import { useStoreContext } from "../store/context";
import { Session } from "../util/types";
import Button from "./Button";

export default function UpcomingSession({ session }: { session: Session }) {
    const { removeSession } = useStoreContext();
    const date = new Date(session.date).toLocaleDateString(
        Intl.DateTimeFormat().resolvedOptions().locale,
        {
            dateStyle: 'medium'
        }
    );

    return <div className="upcoming-session">

        <div>
            <h3>{session.title}</h3>
            <p>{session.summary}</p>
            <time>{date}</time>
        </div>

        <div className="actions">
            <Button textOnly
                onClick={() => removeSession(session.id)}
            >
                Cancel
            </Button>
        </div>

    </div>
}