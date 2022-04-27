import { users } from "../config/mongoCollections";
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const session = require("express-session");
const { ObjectId } = require("mongodb");

export const validate = (username: string, email: string, password: string) => {
    if (!username || !email || !password) {
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
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!regex_username.test(username)) {
        throw "Invalid username";
    }
    if (!regex_email.test(email)) {
        throw "Invalid email";
    }
};

export const authenticate = async (
    username: string,
    email: string,
    password: string
) => {
    validate(username, email, password);

    const userCollection = await users();
    const dbUser = await userCollection.findOne({
        username: username,
    });
    if (!dbUser) {
        throw "Invalid username or password";
    }
    const password_verify = bcrypt.compare(password, dbUser.password);
    if (!password_verify) {
        throw "Invalid username or password";
    }
    return { userId: dbUser._id.toString(), authenticated: true };
};

export const createUser = async (
    username: string,
    email: string,
    password: string
) => {
    validate(username, email, password);

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
    return { userId: insertInfo.insertedId.toString(), userCreated: true };
};
