const express = require("express");
const router = express.Router();
import * as users from "../services/users";

router.post("/users", async (req, res) => {
    try {
        const createdUser = await users.createUser(
            req.body.username,
            req.body.email,
            req.body.password,
        );
        res.json(createdUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export { router };