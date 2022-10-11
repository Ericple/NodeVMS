import { MONGODB_DB } from "../../configuration";
import { MongoClient } from "mongodb";
import IDATATYPES from "../../../types/global";
import { ResEnd } from "../../resEnder";
import WriteLog from "../../streamlog";

const MONGO_CONNECT = new MongoClient(MONGODB_DB.CONNECT_STRING);
const MAIN_DB = MONGO_CONNECT.db(MONGODB_DB.MAIN);
const AC_DB = MAIN_DB.collection(MONGODB_DB.AIRCRAFT);

export async function NEW(obj:IDATATYPES.IAIRCRAFT, res?:any) {
    AC_DB.insertOne({obj}).catch((reason) => {
        if(res) {
            ResEnd(false,reason,res);
        }
    }).then(() => {
        if (res) {
            ResEnd(true,"AIRCRAFT ADDED",res);
        }
    })
}

export async function DELETE(regNum:string, res?:any) {
    AC_DB.deleteOne({"_reg_number": regNum}).catch((reason) => {
        ResEnd(false,reason,res);
    }).then(() => {
        ResEnd(true,"AC DELETED",res);
    })
}

export async function GET(regNUm:string, res?:any) {
    AC_DB.find({ "_reg_num" : regNUm }).toArray((err,result) => {
        if (err) {WriteLog(err.message)} else {
            ResEnd(true,result,res);
        }
    })
}

export async function PATCH(regNum:string, obj:IDATATYPES.IAIRCRAFT, res:any) {
    
}

export const AIRCRAFT = {
    NEW,
    DELETE,
    GET,
    PATCH
}