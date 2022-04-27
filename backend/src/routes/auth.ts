const express = require("express");
const router = express.Router();
import * as auth from "../services/auth";

router.route("/").post(async (req: any, res: any) => {
    try {
        const token = await auth.login(
            req.body.username,
            req.body.email,
            req.body.password
        );
        res.json({
            message: "Success",
            token: token
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.route("/verify").get(auth.verifyJWT, (req: any, res: any) => {
    //not sure how refactor works here with router.route instead of just router, if something breaks try switching this function back to router.get("/verify"), etc
    try {
        res.json({ isLoggedIn: true, username: req.user.username });
    } catch (err) {
        res.json({ isLoggedIn: false, message: err });
    }
});

export { router };
