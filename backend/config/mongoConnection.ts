const MongoClient = require("mongodb").MongoClient;
const settings = require("./settings");
const mongoConfig = settings.mongoConfig;

let _connection: any = undefined;
let _db: any = undefined;

export const connectToDb = async () => {
    if (!_connection) {
        _connection = await MongoClient.connect(mongoConfig.serverUrl);
        _db = await _connection.db(mongoConfig.database);
    }

    return _db;
};
export const closeConnection = async () => {
    _connection.close();
};
