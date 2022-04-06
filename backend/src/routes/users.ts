const express = require("express");
const router = express.Router();
import * as users from "../services/users";

router.post("/", async (req: any, res: any) => {
    try {
        console.log("Registration hit!");
        const createdUser = await users.createUser(
            req.body.username,
            req.body.email,
            req.body.password
        );
        res.json(createdUser);
    } catch (err) {
        console.log(req.body)
        console.log(err)
        res.status(500).json({ error: err });

    }
});

export { router };
