let mongoCollections = require("../config/mongoCollections");
const meals = mongoCollections.meals;
const invitationsService = require("./invitations");

async function get(something: string){
    return something
}

const createMeal = async (title: string, price: number, description: string, filters: object, invitation: string) => {
    const db = await dbConnection.connectToDb();
    const meals = await db.collection("meals");
    const newMeal = {
        title: title,
        price: price,
        description: description,
        filters: filters,
    };
    const insertInfo = await meals.insertOne(newMeal);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not create meal";
    }
    const IDAsString = insertInfo.insertedId.toString();
    invitations.addMealToInvitation(IDAsString, invitation);
    return IDAsString;
}