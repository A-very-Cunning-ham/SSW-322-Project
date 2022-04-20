const express = require("express");
const router = express.Router();
import * as meals from "../services/meals";

router.route("/:searchTerm").get(async (req: any, res: any) => {
    try {
        const searchTerm = req.params.searchTerm;
        const foundMeals = await meals.searchByMealTitle(searchTerm);
        res.json(foundMeals);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

export { router };
