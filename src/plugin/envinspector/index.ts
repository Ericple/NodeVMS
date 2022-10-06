import fs from 'fs';
import { MongoClient } from 'mongodb';
import { exit } from 'process';
import { MONGODB_DB } from '../../util/configuration';

export function ENV_INSPECT() {
    const ENV = fs.existsSync('/.env');
    const DB_CHECK = MongoClient.connect(MONGODB_DB.CONNECT_STRING);
    if (!ENV) {
        exit(420);
    } else if (!DB_CHECK) {
        exit(421);
    }
}