import { posts } from "../config/mongoCollections";
const { ObjectId } = require("mongodb");

export const createMeal = async (
    title: string,
    price: number,
    description: string,
    filters: string[],
    postId: string
) => {
    const postCollection = await posts();
    const newMeal = {
        _id: ObjectId(),
        title: title,
        price: price,
        description: description,
        filters: filters,
    };
    const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $set: { meal: newMeal } }
    );
    if (!updateInfo.acknowledged || !updateInfo.insertedId) {
        throw "Could not create meal";
    }
    const IDAsString = updateInfo.insertedId.toString();
    return IDAsString;
};

export const getMealById = async (mealId: string) => {
    const postCollection = await posts();
    const postWithMeal = await postCollection.findOne({
        "meal._id": ObjectId(mealId),
    });
    if (!postWithMeal) throw "No meal found";
    return postWithMeal.meal;
};

export const updateMeal = async (
    mealId: string,
    title: string,
    price: number,
    description: string,
    filters: string[]
) => {
    const postCollection = await posts();
    const updateInfo = await postCollection.updateOne(
        { "meal._id": ObjectId(mealId) },
        {
            $set: {
                "meal.title": title,
                "meal.price": price,
                "meal.description": description,
                "meal.filters": filters,
            },
        }
    );
    if (updateInfo.modifiedCount === 0) throw "could not update meal";
    return await getMealById(mealId);
};
