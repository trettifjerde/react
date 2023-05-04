import {ObjectId} from 'mongodb';
export type NewMeetUp = {
    address: string,
    title: string,
    image: string,
    description: string
}

export interface MeetUp extends NewMeetUp {
    id: string
}

export interface MongoMeetUp extends NewMeetUp {
    _id: ObjectId
}