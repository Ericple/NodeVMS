import { MONGODB_DB } from "../configuration";
import { MongoClient } from "mongodb";
import { AIRMAIL } from "./airmail";
import { AIRCRAFT } from "./aircraft/aircraft";
import { ACCOUNT } from "./account";

const date = new Date();
const MONGO_CONNECT = new MongoClient(MONGODB_DB.CONNECT_STRING);
const MAIN_DB = MONGO_CONNECT.db(MONGODB_DB.MAIN);
const AIRMAIL_DB = MAIN_DB.collection(MONGODB_DB.AIRMAIL);
const ACCOUNT_DB = MAIN_DB.collection(MONGODB_DB.ACCOUNT);
const AIRCRAFT_DB = MAIN_DB.collection(MONGODB_DB.AIRCRAFT);
export const DATA_ACTIONS = {
    AIRMAIL: AIRMAIL,
    AIRCRAFT: AIRCRAFT,
    ACCOUNT: ACCOUNT
};


//PIERP ACTION
export function NEW_PIERP() {}

export function DELETE_PIERP() {}

export function GET_PIERP() {}