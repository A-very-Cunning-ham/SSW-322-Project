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
                req.session.user,
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
            post.userHasApplied = post.attendees.some(
                (attendee: any) => attendee._id.toString() === req.session.user
            );
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
                req.session.user,
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
                req.session.user
            );
            const post = await posts.getPostById(req.params.id);
            postWithAttendee.userHasApplied = post.attendees.some(
                (attendee: any) => attendee._id.toString() === req.session.user
            );
            res.json(postWithAttendee);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

router.route("/:id/hostCheck").get(async (req: any, res: any) => {
    try {
        const hostPost = await posts.getPostById(
            req.params.id
        );
        hostPost.hostId === req.session.user ? res.json(true) : res.json(false)
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.route("/:id/accepted").get(async (req: any, res: any) => {
    try {
        const acceptedPosts = await posts.getAcceptedAttendeeUsernames(
            req.params.id
        );
        res.json(acceptedPosts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.route("/history").get(async (req: any, res: any) => {
    try {
        const postsByHost = await posts.getPostsByHostId(req.session.user);
        res.json(postsByHost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export { router };
