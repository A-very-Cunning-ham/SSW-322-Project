const express = require("express");
const session = require("express-session");
const router = express.Router();
import * as users from "../services/users";
// import { app } from "../server";

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
    } catch (err) {
        res.status(500).json({ error: err });
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
