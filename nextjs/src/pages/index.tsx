import { ReactNode } from "react";
import MeetupList from "../../components/meetups/MeetupList";
import { MeetUp } from "../../util/types";

const meetUps: MeetUp[] = [
  {
    id: '01',
    title: 'First Meetup',
    image: 'https://www.yarrah.com/media/81/9c/f0/1644837814/Yarrah-cat-meow.jpg',
    description: 'To make some meows',
    address: 'Meow St. 13'
  },
];

const Home: React.FC<{meetups: MeetUp[]}> = ({meetups}) => {
  return (
      <MeetupList meetups={meetups}></MeetupList>
  )
};

export async function getStaticProps() {
  return {
    props: {
      meetups: meetUps
    }
  }
}

export default Home
