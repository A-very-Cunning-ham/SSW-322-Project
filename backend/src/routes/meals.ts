const express = require("express");
const router = express.Router();
import * as meals from "../services/meals";

router.route("/:id").get(async (req: any, res: any) => {
    try {
        const meal = await meals.getMealById(req.params.id);
        res.json(meal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.route("/:id").post(async (req: any, res: any) => {
    try {
        const newMeal = await meals.createMeal(
            req.body.title,
            req.body.course,
            req.body.price,
            req.body.description,
            req.body.filters,
            req.params.id
        );
        res.json(newMeal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.route("/:id").put(async (req: any, res: any) => {
    try {
        const updatedMeal = await meals.updateMeals(req.body.mealArray);
        res.json(updatedMeal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export { router };
