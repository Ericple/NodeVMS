import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./secrets";
import { MONGODB_DB_NAME } from "./configuration";

const mongoConnect = new MongoClient(MONGODB_URI);
const database = mongoConnect.db(MONGODB_DB_NAME.MAIN);
const sessionDB = database.collection(MONGODB_DB_NAME.SESSION);
export function createSession(identity:string): string | boolean {
    const key = Math.random().toString(36).substring(2);
    sessionDB.insertOne({
        _key: key,
        _identity: identity
    }).catch(() => {
        return false;
    }).then(() => {
        return key;
    });
    return false;
}