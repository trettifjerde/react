import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { NewMeetUp } from "../../util/types";

const NewMeetUp: React.FC = () => {
    const addMeetupHandler = (m: NewMeetUp) => {}
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetUp;