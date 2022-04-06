const express = require("express");
const router = express.Router();
import * as meals from "../services/meals";

router.get("/:id", async (req: any, res: any) => {
    try {
        const meal = await meals.getMealById(req.params.id);
        res.json(meal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post("/:id", async (req: any, res: any) => {
    try {
        const createdMeal = await meals.createMeal(
            req.body.title,
            req.body.price,
            req.body.description,
            req.body.filters,
            req.params.id
        );
        res.json(createdMeal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:id", async (req: any, res: any) => {
    try {
        const updatedMeal = await meals.updateMeal(
            req.params.id,
            req.body.title,
            req.body.price,
            req.body.description,
            req.body.filters
        );
        res.json(updatedMeal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export { router };
