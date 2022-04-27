const express = require("express");
const session = require("express-session");
const router = express.Router();
import * as users from "../services/users";
// import { app } from "../server";

router.route("/login").post(async (req: any, res: any) => {
    try {
        if (
            await (
                await users.authenticate(
                    req.body.username,
                    req.body.email,
                    req.body.password
                )
            ).authenticated
        ) {
            app.use(
                session({
                    name: "AuthCookie",
                    user: req.body.username,
                })
            );
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
