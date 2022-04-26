const express = require("express");
const router = express.Router();
import * as posts from "../services/posts";

router.route("/:searchTerm").get(async (req: any, res: any) => {
    try {
        const searchTerm = req.params.searchTerm;
        const foundPosts = await posts.searchByPostTitle(searchTerm);
        res.json(foundPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

export { router };
