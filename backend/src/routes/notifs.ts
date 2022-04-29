const express = require("express");
const router = express.Router();
import * as notifs from "../services/notifs";

router
    .route("/host")
    .get(async (req: any, res: any) => {
        try {
            const foundNotifications = notifs.hostNotifications(
                req.session.user
            );
            res.json(foundNotifications);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    })
    .post(async (req: any, res: any) => {
        try {
            const notifResponse = await notifs.respond(
                req.session.user,
                req.body.userId,
                req.body.status
            );
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

router.route("/guest").get(async (req: any, res: any) => {
    try {
        const foundNotifications = notifs.attendeeNotifications(
            req.session.user
        );
        res.json(foundNotifications);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export { router };
