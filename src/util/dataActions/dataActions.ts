import { MONGODB_DB } from "../configuration";
import { MongoClient } from "mongodb";
import IDATATYPES from "../../types/global";
import { ResEnd } from "../resEnder";
import WriteLog from "../streamlog";
import { AIRMAIL } from "./airmail";

const date = new Date();
const MONGO_CONNECT = new MongoClient(MONGODB_DB.CONNECT_STRING);
const MAIN_DB = MONGO_CONNECT.db(MONGODB_DB.MAIN);
const AIRMAIL_DB = MAIN_DB.collection(MONGODB_DB.AIRMAIL);
const ACCOUNT_DB = MAIN_DB.collection(MONGODB_DB.ACCOUNT);
const AIRCRAFT_DB = MAIN_DB.collection(MONGODB_DB.AIRCRAFT);
export const DATA_ACTIONS = {
    AIRMAIL: AIRMAIL
};

//ACCOUNT ACTION
export function NEW_ACCOUNT() {}

export function DELETE_ACCOUNT() {}

export function GET_ACCOUNT() {}

export function PATCH_ACCOUNT() {}

//AIRCRAFT ACTION
export function NEW_AIRCRAFT() {}

export function DELETE_AIRCRAFT() {}

export function GET_AIRCRAFT() {}

export function PATCH_AIRCRAFT() {}

//PIERP ACTION
export function NEW_PIERP() {}

export function DELETE_PIERP() {}

export function GET_PIERP() {}