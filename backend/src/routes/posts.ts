const express = require("express");
const router = express.Router();
import * as posts from "../services/posts";

router
    .route("/")
    .get(async (req: any, res: any) => {
        try {
            const allPosts = await posts.getAllPosts();
            res.json(allPosts);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    })
    .post(async (req: any, res: any) => {
        try {
            const newPost = await posts.createPost(
                req.body.title,
                req.body.startTime,
                req.body.endTime,
                req.body.price,
                req.body.filters,
                // req.body.hostId,
                req.body.capacity,
                req.body.address
            );
            res.json(newPost);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

router
    .route("/:id")
    .get(async (req: any, res: any) => {
        try {
            const post = await posts.getPostById(req.params.id);
            res.json(post);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    })
    .put(async (req: any, res: any) => {
        try {
            const updatedPost = await posts.updatePost(
                req.params.id,
                req.body.title,
                req.body.startTime,
                req.body.endTime,
                req.body.price,
                req.body.filters,
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
    })
    .patch(async (req: any, res: any) => {
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
