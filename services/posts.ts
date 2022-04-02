const { ObjectId } = require("mongodb");
import { posts } from "../config/mongoCollections";

export const getPostById = async (postId: string) => {
    if (!ObjectId.isValid(postId)) {
        throw "Invalid ID";
    }
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectId(postId) });
    if (!post) throw "No post found";
    return post;
};

export const createPost = async (
    startTime: Date,
    endTime: Date,
    hostId: string,
    capacity: number,
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    }
) => {
    const postCollection = await posts();
    const newPost = {
        startTime: startTime,
        endTime: endTime,
        hostId: hostId,
        capacity: capacity,
        address: address,
        meal: null,
        attendees: [],
        current: startTime > new Date(), //unsure if this comparison actually works, there's another datetime library called moment.js that might be worth checking out if we have issues.
    };
    const insertInfo = await postCollection.insertOne(newPost);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not create post";
    }
    const IDAsString = insertInfo.insertedId.toString();
    return IDAsString;
};

export const addAttendeeToPost = async (postId: string, attendeeId: string) => {
    if (!ObjectId.isValid(postId) || !ObjectId.isValid(attendeeId)) {
        throw "Invalid ID";
    }
    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $addToSet: { attendees: attendeeId } }
    );
    if (updateInfo.modifiedCount === 0) throw "could not add attendee to post";
    return await getPostById(postId);
};

export const updatePost = async (
    postId: string,
    startTime: Date,
    endTime: Date,
    hostId: string,
    capacity: number,
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    },
    meal,
    attendees: string[]
) => {
    if (!ObjectId.isValid(postId)) {
        throw "Invalid ID";
    }
    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        {
            $set: {
                startTime: startTime,
                endTime: endTime,
                hostId: hostId,
                capacity: capacity,
                address: address,
                meal: meal,
                attendees: attendees,
                current: startTime > new Date(),
            },
        }
    );
    if (updateInfo.modifiedCount === 0) throw "could not update post";
    return await getPostById(postId);
};
