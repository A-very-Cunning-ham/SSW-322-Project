import { meals } from "../config/mongoCollections";
import { addMealToPost } from "./posts";
const { ObjectId } = require("mongodb");

export const createMeal = async (
    title: string,
    price: number,
    description: string,
    filters: object,
    postId: string
) => {
    const mealCollection = await meals();
    const newMeal = {
        title: title,
        price: price,
        description: description,
        filters: filters,
    };
    const insertInfo = await mealCollection.insertOne(newMeal);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not create meal";
    }
    const IDAsString = insertInfo.insertedId.toString();
    addMealToPost(IDAsString, postId);
    return IDAsString;
};

export const getMealById = async (mealId: string) => {
    const mealCollection = await meals();
    const meal = await mealCollection.findOne({ _id: ObjectId(mealId) });
    if (!meal) throw "No meal found";
    return meal;
};

export const updateMeal = async (
    mealId: string,
    title: string,
    price: number,
    description: string,
    filters: object
) => {
    const mealCollection = await meals();
    const updateInfo = await mealCollection.updateOne(
        { _id: ObjectId(mealId) },
        {
            $set: {
                title: title,
                price: price,
                description: description,
                filters: filters,
            },
        }
    );
    if (updateInfo.modifiedCount === 0) throw "could not update meal";
    return await getMealById(mealId);
};
