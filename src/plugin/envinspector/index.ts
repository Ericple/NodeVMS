import fs from 'fs';
import { MongoClient } from 'mongodb';
import { exit } from 'process';
import { MONGODB_DB } from '../../util/configuration';

export function ENV_INSPECT() {
    const ENV = fs.existsSync('/.env');
    const DB_CHECK = MongoClient.connect(MONGODB_DB.CONNECT_STRING);
    if (!ENV) {
        console.log("Error: 420");
        process.exitCode = 420;
        //exit(420);
    } else if (!DB_CHECK) {
        console.log("Error: 421");
        process.exitCode = 421;
        //exit(421);
    }
}