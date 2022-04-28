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
    title: string,
    startTime: Date,
    endTime: Date,
    price: number,
    filters: string[],
    // hostId: string,
    capacity: number,
    address: string
) => {
    const postCollection = await posts();
    const newPost = {
        title: title,
        startTime: startTime,
        endTime: endTime,
        price: price,
        filters: filters,
        // hostId: ObjectId(hostId),
        capacity: capacity,
        address: address,
        meals: [],
        attendees: [],
        // current: startTime > new Date(), //unsure if this comparison actually works, there's another datetime library called moment.js that might be worth checking out if we have issues.
    };
    const insertInfo = await postCollection.insertOne(newPost);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not create post";
    }
    postCollection.createIndex({ title: "text" });
    const IDAsString = insertInfo.insertedId.toString();
    return IDAsString;
};

export const addAttendeeToPost = async (postId: string, attendeeId: string) => {
    if (!ObjectId.isValid(postId) || !ObjectId.isValid(attendeeId)) {
        throw "Invalid ID";
    }
    const attendeeObject = {
        _id: ObjectId(attendeeId),
        status: "pending",
    };
    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $addToSet: { attendees: attendeeObject } }
    );
    if (updateInfo.modifiedCount === 0) throw "could not add attendee to post";
    return await getPostById(postId);
};

export const getAllPosts = async () => {
    const postCollection = await posts();
    const foundPosts = await postCollection.find({}).toArray();
    return foundPosts;
};

export const updatePost = async (
    postId: string,
    title: string,
    startTime: Date,
    endTime: Date,
    price: number,
    filters: string[],
    hostId: string,
    capacity: number,
    address: string,
    meals: object[],
    attendees: object[]
) => {
    if (!ObjectId.isValid(postId)) {
        throw "Invalid ID";
    }
    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        {
            $set: {
                title: title,
                startTime: startTime,
                endTime: endTime,
                hostId: hostId,
                capacity: capacity,
                address: address,
                meals: meals,
                attendees: attendees,
                // current: startTime > new Date(),
            },
        }
    );
    if (updateInfo.modifiedCount === 0) throw "could not update post";
    return await getPostById(postId);
};

// export const getPostsByHostId = async (hostId: string) => {
//     if (!ObjectId.isValid(hostId)) {
//         throw "Invalid ID";
//     }
//     const postCollection = await posts();
//     const foundPosts = await postCollection
//         .find({
//             hostId: ObjectId(hostId),
//         })
//         .toArray();
//     if (foundPosts.length === 0) throw "No posts found";
//     return foundPosts;
// };

export const searchByPostTitle = async (postTitle: string) => {
    const postCollection = await posts();
    const foundPosts = await postCollection
        .find({ $text: { $search: postTitle } })
        .toArray();
    return foundPosts;
};

export const searchByPostFilters = async (filters: string[]) => {
    const postCollection = await posts();
    const foundPosts = await postCollection
        .find({ filters: { $all: filters } })
        .toArray();
    return foundPosts;
};
