import { MONGODB_DB } from "../../configuration";
import { MongoClient } from "mongodb";
import IDATATYPES from "../../../types/global";
import { ResEnd } from "../../resEnder";
import WriteLog from "../../streamlog";

const MONGO_CONNECT = new MongoClient(MONGODB_DB.CONNECT_STRING);
const MAIN_DB = MONGO_CONNECT.db(MONGODB_DB.MAIN);
const AC_DB = MAIN_DB.collection(MONGODB_DB.ACCOUNT);

export async function NEW(obj:IDATATYPES.IACCOUNT, res?:any) {
    AC_DB.insertOne({obj}).catch((reason) => {
        if(res) {
            ResEnd(false,reason,res);
        }
    }).then(() => {
        if (res) {
            ResEnd(true,"ACCOUNT ADDED",res);
        }
    })
}

export async function DELETE(identity:string, res?:any) {
    AC_DB.deleteOne({"_reg_number": identity}).catch((reason) => {
        ResEnd(false,reason,res);
    }).then(() => {
        ResEnd(true,"ACCOUNT DELETED",res);
    })
}

export async function GET(identity:string, res?:any) {
    AC_DB.find({ "_reg_num" : identity }).toArray((err,result) => {
        if (err) {WriteLog(err.message)} else {
            ResEnd(true,result,res);
        }
    })
}

export async function PATCH(identity:string, obj:IDATATYPES.IACCOUNT, res:any) {
    
}

export const ACCOUNT = {
    NEW,
    DELETE,
    GET,
    PATCH
}