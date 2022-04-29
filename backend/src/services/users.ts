import { users } from "../config/mongoCollections";
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const session = require("express-session");
const { ObjectId } = require("mongodb");

export const validate = (
    username: string,
    password: string,
    email?: string
) => {
    if (!username || !password) {
        throw "Invalid username or password";
    }

    if (
        username.length < 4 ||
        password.length < 6 ||
        username.trim().length === 0 ||
        password.trim().length === 0 ||
        username.includes(" ") ||
        password.includes(" ")
    ) {
        throw "Invalid username or password";
    }

    const regex_username = new RegExp(/^[a-z0-9]+$/i);
    const regex_email = new RegExp(
        /^\S+@\S+\.\S+$/
    );
    if (!regex_username.test(username)) {
        throw "Invalid username";
    }
    if (email) {
        if (!regex_email.test(email)) {
            throw "Invalid email";
        }
    }
};

export const authenticate = async (username: string, password: string) => {
    validate(username, password);

    const userCollection = await users();
    const dbUser = await userCollection.findOne({
        username: username,
    });
    if (!dbUser) {
        throw "Invalid username or password: authenticate";
    }
    const password_verify = bcrypt.compare(password, dbUser.password);
    if (!password_verify) {
        throw "Invalid username or password: authenticate";
    }
    return { userId: dbUser._id.toString(), authenticated: true };
};

export const createUser = async (
    username: string,
    email: string,
    password: string
) => {
    validate(username, password, email, );

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
        username: username,
        email: email,
        password: hashedPassword,
    };
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not create user";
    }
    return { userId: insertInfo.insertedId.toString(), userCreated: true };
};

export const getUserById = async (userId: string) => {
    if (!ObjectId.isValid(userId)) {
        throw "Invalid ID";
    }
    const userCollection = await users();
    const dbUser = await userCollection.findOne({
        _id: ObjectId(userId),
    });
    if (!dbUser) {
        throw "User not found";
    }
    return dbUser;
};
