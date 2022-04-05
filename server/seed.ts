import { posts } from "./config/mongoCollections";
const { ObjectId } = require("mongodb");
import * as postFuncs from "./services/posts";
import * as mealFuncs from "./services/meals";
const seedDB = async () => {
    const postCollection = await posts();
    postCollection.drop();

    try {
        let newPost1 = await postFuncs.createPost(
            new Date("2022-05-01"),
            new Date("2022-05-02"),
            new ObjectId.toString(),
            4,
            {
                street: "123 Main St",
                city: "Boston",
                state: "MA",
                country: "USA",
                zip: "02134",
            }
        );

        let newMeal1 = await mealFuncs.createMeal(
            "Kentucky Fried Chicken",
            3.5,
            "Golden battered chicken served fresh and crispy.",
            {
                vegetarian: false,
                vegan: false,
                chicken: true,
                beef: false,
                pork: false,
                seafood: false,
                rice: false,
                pasta: false,
                soup: false,
                dessert: false,
                alcohol: false,
            },
            newPost1
        );
    } catch (error) {
        console.log(error);
    }
};

await seedDB();
