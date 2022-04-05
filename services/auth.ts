import { users } from "../config/mongoCollections";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

export const login = async (
    username: string,
    password: string,
) => {
    const userCollection = await users();
    const dbUser = await userCollection.findOne({
        "username": username,
    });
    if (!dbUser) {
        throw "Invalid username or password";
    }
    const password_verify = bcrypt.compare(password, dbUser.password);
    if (!password_verify) {
        throw "Invalid username or password";
    }
    const payload = {
        id: dbUser._id,
        username: dbUser.username,
    }
    jwt.sign(
        payload, 
        process.env.JWT_SECRET,
        {expiresIn: 86400},
        (err, token) => {
            if (err) throw err;
            return "Bearer " + token;
        }
    )
};

export const verifyJWT = async (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(" ")[1];
    if (!token) {
        return res.json({isLoggedIn: false, message: "Incorrect Token Given"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({isLoggedIn: false, message: "Failed to authenticate"});
        }
        req.user = {};
        req.user.id = decoded.id;
        req.user.username = decoded.username;
        next();
    })
};