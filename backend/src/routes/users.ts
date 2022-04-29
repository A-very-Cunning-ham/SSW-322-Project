const express = require("express");
const session = require("express-session");
const router = express.Router();
import * as users from "../services/users";
// import { app } from "../server";

// Also acts as a "logged in" function
router.route("/loggedin").get(async (req: any, res: any) =>
        req.session.user ? res.json(true) : res.json(false)
    );

router.route("/login").post(async (req: any, res: any) => {
    try {
        const auth_response = await users.authenticate(
            req.body.username,
            req.body.password
        );

        if (auth_response.authenticated) {
            req.session.user = await auth_response.userId;
            res.json({
                message: "Success",
            });
        }
        else {
            res.json({
                message: "Failure",
            });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.route("/logout").get((req: any, res: any) => {
    req.session.destroy();
    res.send("Logged out");
});

router.route("/register").post(async (req: any, res: any) => {
    try {
        console.log("Registration hit!");
        const createdUser = await users.createUser(
            req.body.username,
            req.body.email,
            req.body.password
        );
        res.json(createdUser);
    } catch (err) {
        console.log(req.body);
        console.log(err);
        res.status(500).json({ error: err });
    }
});

export { router };
