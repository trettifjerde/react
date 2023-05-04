import { clusterUrl } from "@/pages/api/authKeys";
import { MeetUp, MongoMeetUp } from "./types";
import { MongoClient, FindOptions, ObjectId} from 'mongodb';

export async function getMeetups() {
    const client = await MongoClient.connect(clusterUrl);
    const dbMeetups = await client.db().collection<MongoMeetUp>('meetups').find().toArray();

    const meetups = dbMeetups.map(meetup => ({
      title: meetup.title,
      description: meetup.description,
      id: meetup._id.toString(),
      address: meetup.address,
      image: meetup.image
    }));
    client.close();
    return meetups;
}

export async function getMeetupIds() {
  const client = await MongoClient.connect(clusterUrl);
  const ids = (await client.db().collection<MongoMeetUp>('meetups')
    .find({}, {_id: 1} as FindOptions<MongoMeetUp>).toArray())
      .map(m => (m._id.toString()));
  client.close();
  return ids;
}

export async function getMeetup(id: string) {
  const client = await MongoClient.connect(clusterUrl);
  const meetup = await client.db().collection<MongoMeetUp>('meetups').findOne({_id: new ObjectId(id)})
  client.close();

  return meetup ? {
    title: meetup.title, 
    id: meetup._id.toString(),
    address: meetup.address,
    image: meetup.image,
    description: meetup.description,
  } as MeetUp : {} as MeetUp;
}