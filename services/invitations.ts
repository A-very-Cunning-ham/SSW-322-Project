const { ObjectId } = require('mongodb');
let invitations = require("../config/mongoCollections").invitations;
const addMealToInvitation = async (mealId: string, invitationId: string) => {
    if (!ObjectId.isValid(mealId) || !ObjectId.isValid(invitationId)) {
        throw "Invalid ID";
    }

}

module.exports = {
    addMealToInvitation
}