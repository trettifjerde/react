import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { NewMeetUp } from "../../util/types";
import { useCallback } from "react";

const NewMeetUp: React.FC = () => {
    const router = useRouter();
    const addMeetupHandler = useCallback(async (meetup: NewMeetUp) => {
        const res = await fetch('/api/new-meetup', {
            method: 'POST', 
            body: JSON.stringify(meetup), 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        router.push('/');
    }, [router]);
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetUp;