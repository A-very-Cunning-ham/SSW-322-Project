const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const seedDB = async () => {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const collection = client.db("placeholder").collection("posts");

        collection.drop();

        //TODO add creation funcs here
    } catch (error) {
        console.log(error);
    }
};

seedDB();
