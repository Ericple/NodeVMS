import { MONGODB_DB } from "../../configuration";
import { MongoClient } from "mongodb";
import IDATATYPES from "../../../types/global";
import { ResEnd } from "../../resEnder";
import WriteLog from "../../streamlog";

const date = new Date();
const MONGO_CONNECT = new MongoClient(MONGODB_DB.CONNECT_STRING);
const MAIN_DB = MONGO_CONNECT.db(MONGODB_DB.MAIN);
const AIRMAIL_DB = MAIN_DB.collection(MONGODB_DB.AIRMAIL);

//AIRMAIL ACTION
export async function NEW(airMail:IDATATYPES.IAIRMAIL, res?:any) {
    airMail._date = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    if (typeof airMail._receiver === 'object') {
        const _receiverCount = airMail._receiver.length
        for (let i = 0;i<_receiverCount;i++) {
            AIRMAIL_DB.insertOne({
                _sender: airMail._sender,
                _receiver: airMail._receiver[i],
                _date: airMail._date,
                _subject: airMail._subject,
                _content: airMail._content
            }).catch((reason) => {
                if(res) {
                    ResEnd(false,reason,res);
                }
            })
        }
        if(res) {
            ResEnd(true,"Mail sent",res);
        }
    } else {
        AIRMAIL_DB.insertOne({
            _sender: airMail._sender,
            _receiver: airMail._receiver,
            _date: airMail._date,
            _subject: airMail._subject,
            _content: airMail._content
        }).catch((reason)=>{
            if(res) {
                ResEnd(false,reason,res);
            }
            console.log("error"+reason);
        }).then(() => {
            if(res) {
                ResEnd(true,"Mail sent",res);
            }
            WriteLog(`Mail Sent at ${airMail._date}`);
        })
    }
}

export function DELETE(id:string | string[], res?:any) {
    if (typeof id === 'object') {
        for (const objId in id) {
            AIRMAIL_DB.deleteOne({"_objectId": objId});
        }
    } else {
        AIRMAIL_DB.deleteOne({"_objectId": id});
    }
    
    if(res) {
        ResEnd(true,"Mail Deleted",res);
    }
}

export function GET(identity:string, res:any) {
    AIRMAIL_DB.find({$or:[
        {"_sender": identity},
        {"_receiver": identity}
    ]}).toArray((error,result) => {
        if (error) throw error;
        res.send(JSON.stringify(result));
    })
}

export const AIRMAIL = {
    NEW,
    DELETE,
    GET
}