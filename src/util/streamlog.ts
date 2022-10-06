//IMPORT STATEMENT
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from './secrets';
import { MONGODB_DB } from './configuration';

//CONSTANT STATEMENT
const mongoConnect = new MongoClient(MONGODB_URI);
const database = mongoConnect.db(MONGODB_DB.MAIN);
const logDB = database.collection(MONGODB_DB.LOG);
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

export async function ActionLog(ActionName:string,IP:string) {
    logDB.insertOne({
        _logType:"ActionLog",
        _Action:ActionName,
        _ip:IP,
        _date:date.toLocaleDateString()+" "+date.toLocaleTimeString(),
    })
    console.log("[STREAMLOG]: New ActionLog Recorded");
}

export default WriteLog;