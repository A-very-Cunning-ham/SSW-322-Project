import { posts } from "../config/mongoCollections";
const { ObjectId } = require("mongodb");

export const createMeal = async (
    title: string,
    course: string,
    price: number,
    description: string,
    filters: string[],
    postId: string
) => {
    const postCollection = await posts();
    const newMeal = {
        _id: ObjectId(),
        title: title,
        course: course,
        price: price,
        description: description,
        filters: filters,
    };
    const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $push: { meals: newMeal } }
    );
    if (updateInfo.modifiedCount === 0) {
        throw "Could not create meal";
    }
    postCollection.createIndex({ "meals.title": "text" });
    return newMeal;
};

export const getMealById = async (mealId: string) => {
    const postCollection = await posts();
    const postWithMeal = await postCollection.findOne({
        "meals._id": ObjectId(mealId),
    });
    if (!postWithMeal) throw "No meal found";
    return postWithMeal.meal;
};

export const updateMeals = async (
    mealArray: Array<{
        mealId: string;
        title: string;
        course: string;
        price: number;
        description: string;
        filters: string[];
    }>
) => {
    const postCollection = await posts();
    for (let meal of mealArray) {
        const updateInfo = await postCollection.updateOne(
            { "meals._id": ObjectId(meal.mealId) },
            {
                $set: {
                    "meals.$.title": meal.title,
                    "meals.$.price": meal.price,
                    "meals.$.course": meal.course,
                    "meals.$.description": meal.description,
                    "meals.$.filters": meal.filters,
                },
            }
        );
        if (updateInfo.modifiedCount === 0) throw "could not update meal";
    }
};

export const searchByMealTitle = async (mealTitle: string) => {
    const postCollection = await posts();
    const foundPosts = await postCollection
        .find({ $text: { $search: mealTitle } })
        .toArray();
    return foundPosts;
};

export const searchByMealFilters = async (filters: string[]) => {
    const postCollection = await posts();
    const foundPosts = await postCollection
        .find("meals.filters", { $in: filters })
        .toArray();
    return foundPosts;
};
