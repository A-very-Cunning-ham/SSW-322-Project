import { users } from "../config/mongoCollections";
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

export const createUser = async (
    username: string,
    email: string,
    password: string
) => {
    const userCollection = await users();
    const takenUsername = await userCollection.findOne({
        username: username,
    });
    const takenEmail = await userCollection.findOne({
        email: email,
    });
    if (takenUsername || takenEmail) {
        throw "Username or email already taken";
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        _id: ObjectId(),
        username: username,
        email: email,
        password: hashedPassword,
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not create user";
    }
    const IDAsString = insertInfo.insertedId.toString();
    return IDAsString;
};
