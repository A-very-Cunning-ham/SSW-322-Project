const { ObjectId } = require("mongodb");
import { posts, users } from "../config/mongoCollections";

export const findNotifications = async (userId: string) => {
    if (!userId || !ObjectId.isValid(userId)) {
        throw "You must provide a valid userId to search for notifications";
    }
    const postCollection = await posts();

    const foundHostNotifications = await postCollection
        .aggregate([
            { $match: { hostId: ObjectId(userId) } },
            { $unwind: "$attendees" },
            { $match: { "attendees.status": "pending" } },
            { $group: { attendees: { $push: "$attendees" } } },
        ])
        .toArray();

    console.log(foundHostNotifications);

    const foundAttendeeNotifications = await postCollection
        .aggregate([
            { $match: { "attendees._id": ObjectId(userId) } },
            { $unwind: "$attendees" },
            { $match: { "attendees._id": ObjectId(userId) } },
            { $group: { attendees: { $push: "$attendees" } } },
        ])
        .toArray();

    console.log(foundAttendeeNotifications);

    const foundNotifications = foundHostNotifications.concat(
        foundAttendeeNotifications
    );

    return foundNotifications;
};
