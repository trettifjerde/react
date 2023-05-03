export type NewMeetUp = {
    address: string,
    title: string,
    image: string,
    description: string
}

export interface MeetUp extends NewMeetUp {
    id: string
}