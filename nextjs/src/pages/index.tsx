import MeetupList from "../../components/meetups/MeetupList";
import { getMeetups } from "../../util/casters";
import { MeetUp } from "../../util/types";

const Home: React.FC<{meetups: MeetUp[]}> = ({meetups}) => {
  return (
      <MeetupList meetups={meetups}></MeetupList>
  )
};

export async function getStaticProps() {
  const meetups = await getMeetups();

  return {
    props: {
      meetups: meetups
    },
    //revalidate: 10 - regenerate page every 10 - if requests are coming
  }
}

/*export async function getServerSideProps() {
//export async function getServerSideProps(context) {
  //const {req, res} = context;
  return {
    props: {
      meetups: meetUps
    }
  }
} */

export default Home;
