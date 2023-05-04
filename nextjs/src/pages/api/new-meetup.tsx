import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NewMeetUp } from "../../../util/types";
import { clusterUrl } from "./authKeys";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body as NewMeetUp;
        console.log('inside handler');

        const client = await MongoClient.connect(clusterUrl);
        const db = client.db();
        const meetups = db.collection('meetups');
        const result = await meetups.insertOne(data);
        console.log('mongo result', result);
        client.close();

        res.status(201).json({message: 'Meetup inserted'});
    }
}
export default handler;