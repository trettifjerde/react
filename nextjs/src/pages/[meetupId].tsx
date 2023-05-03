import MeetUpDetailsComponent from "../../components/meetups/MeetupDetails";

const meetup =   {
    id: '01',
    title: 'First Meetup',
    image: 'https://www.yarrah.com/media/81/9c/f0/1644837814/Yarrah-cat-meow.jpg',
    description: 'To make some meows',
    address: 'Meow St. 13'
};
const MeetUpDetails = () => {
    return <MeetUpDetailsComponent meetup={meetup} />
}

export default MeetUpDetails;