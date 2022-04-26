import { posts } from "../config/mongoCollections";
const { ObjectId } = require("mongodb");

export const createMeal = async (
    title: string,
    course: string,
    description: string,
    postId: string
) => {
    const postCollection = await posts();
    const newMeal = {
        _id: ObjectId(),
        title: title,
        course: course,
        description: description,
    };
    const updateInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $push: { meals: newMeal } }
    );
    if (updateInfo.modifiedCount === 0) {
        throw "Could not create meal";
    }
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
        description: string;
    }>
) => {
    const postCollection = await posts();
    for (let meal of mealArray) {
        const updateInfo = await postCollection.updateOne(
            { "meals._id": ObjectId(meal.mealId) },
            {
                $set: {
                    "meals.$.title": meal.title,
                    "meals.$.course": meal.course,
                    "meals.$.description": meal.description,
                },
            }
        );
        if (updateInfo.modifiedCount === 0) throw "could not update meal";
    }
};
