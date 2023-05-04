import MeetUpDetailsComponent from "../../components/meetups/MeetupDetails";
import { MeetUp } from "../../util/types";
import { GetStaticProps, NextPage } from "next";
import { getMeetup, getMeetupIds, getMeetups } from "../../util/casters";

type MeetUpDetailsProps = {
    meetup: MeetUp
}

const MeetUpDetails: NextPage<{meetup: MeetUp}> = ({meetup}) => {
    return <MeetUpDetailsComponent meetup={meetup} />
}

export const getStaticProps : GetStaticProps<MeetUpDetailsProps> = async (context) => {
    const meetupId = context.params!.meetupId as string;
    const meetup = await getMeetup(meetupId);
    return {
        props: {
            meetup: meetup
        }
    }
}

export async function getStaticPaths() {
    const meetups = await getMeetupIds();
    const paths = meetups.map(meetupId => ({params: {meetupId: meetupId}}));

    return {
        fallback: false, //false - 404 if not listed, true - try to generate dynamically when request is received
        paths: paths
    }
}

export default MeetUpDetails;