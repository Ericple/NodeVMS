import fs from 'fs';
import { MongoClient } from 'mongodb';
import path from 'path';
import { MONGODB_DB } from '../../util/configuration';

export function ENV_INSPECT() {
    envinLog("Checking .env file existence");
    const ENV = fs.existsSync(path.join(__dirname,"..","..","..",".env"));
    envinLog("Checking MongoDB Connection")
    const DB_CHECK = MongoClient.connect(MONGODB_DB.CONNECT_STRING);
    if (!ENV) {
        console.log("Error: 420");
        process.exitCode = 420;
    } else if (!DB_CHECK) {
        console.log("Error: 421");
        process.exitCode = 421;
    }
}

function envinLog(message:string) {
    console.log("[ENVINSPECTOR] "+message);
}