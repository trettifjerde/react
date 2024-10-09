import { Session } from "../util/types";
import Button from "./Button";

export default function SessionListItem({ session }: { session: Session }) {
    return <div className="session-item">

        <img src={session.image} alt="" />

        <div className="session-data">

            <h3>{session.title}</h3>

            <p>{session.summary}</p>

            <div className="actions">
                <Button textOnly={false} to={session.id}>Learn more</Button>
            </div>

        </div>

    </div>
}