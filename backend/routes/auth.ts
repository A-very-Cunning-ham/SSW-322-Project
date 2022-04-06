const express = require("express");
const router = express.Router();
import * as auth from "../services/auth";

router.post("/auth", async (req: any, res: any) => {
    try {
        const token = await auth.login(
            req.body.username,
            req.body.email,
            req.body.password,
        );
        res.json(token);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("auth/verify", auth.verifyJWT, (req: any, res: any) => {
    try { 
        res.json({isLoggedIn: true, username: req.user.username});
    } catch (err) {
        res.json({isLoggedIn: false, message: err});
    }
})

export { router };