//IMPORT STATEMENT
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from './secrets';
import { MONGODB_DB_NAME } from './configuration';

//CONSTANT STATEMENT
const mongoConnect = new MongoClient(MONGODB_URI);
const database = mongoConnect.db(MONGODB_DB_NAME.MAIN);
const logDB = database.collection(MONGODB_DB_NAME.LOG);
const date = new Date();

//FUNCTION STATEMENT
async function WriteLog(message:string) {
    if (message !== '') {
        logDB.insertOne({
            _message:message,
            _date: date.toLocaleDateString()+" "+date.toLocaleTimeString(),
        })
    }
    console.log("[STREAMLOG]: " + message);
}

export default WriteLog;