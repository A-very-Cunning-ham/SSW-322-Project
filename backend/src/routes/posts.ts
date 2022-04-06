const express = require("express");
const router = express.Router();
import * as posts from "../services/posts";

router.get("/", async (req: any, res: any) => {
    try {
        const allPosts = await posts.getAllPosts();
        res.json(allPosts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post("/", async (req: any, res: any) => {
    try {
        const newPost = await posts.createPost(
            req.body.startTime,
            req.body.endTime,
            // req.body.hostId,
            req.body.capacity,
            req.body.address
        );
        res.json(newPost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id", async (req: any, res: any) => {
    try {
        const post = await posts.getPostById(req.params.id);
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:id", async (req: any, res: any) => {
    try {
        const updatedPost = await posts.updatePost(
            req.params.id,
            req.body.startTime,
            req.body.endTime,
            req.body.hostId,
            req.body.capacity,
            req.body.address,
            req.body.meal,
            req.body.attendees
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.patch("/:id", async (req: any, res: any) => {
    try {
        const postWithAttendee = await posts.addAttendeeToPost(
            req.params.id,
            req.body.attendeeId
        );
        res.json(postWithAttendee);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// router.get("/hostedby/:id", async (req: any, res: any) => {
//     try {
//         const postsByHost = await posts.getPostsByHostId(req.params.id);
//         res.json(postsByHost);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

export { router };
