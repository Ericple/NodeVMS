import { MONGODB_DB } from "../configuration";
import { MongoClient } from "mongodb";
import DATATYPES from "../../types/global";
import { ResEnd } from "../resEnder";

const date = new Date();
const MONGO_CONNECT = new MongoClient(MONGODB_DB.CONNECT_STRING);
const MAIN_DB = MONGO_CONNECT.db(MONGODB_DB.MAIN);
const AIRMAIL_DB = MAIN_DB.collection(MONGODB_DB.AIRMAIL);
const ACCOUNT_DB = MAIN_DB.collection(MONGODB_DB.ACCOUNT);
const AIRCRAFT_DB = MAIN_DB.collection(MONGODB_DB.AIRCRAFT);

let airMail:DATATYPES.MAIL;

//邮件发送
export function SEND_AIRMAIL(sender:string, receiver:string | string[], subject:string, content:string, res:any) {
    airMail._sender = sender;
    airMail._receiver = receiver;
    airMail._subject = subject;
    airMail._content = content;
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
                ResEnd(false,"error",res);
            })
        }
        ResEnd(true,"Mail sent",res);
    } else {
        AIRMAIL_DB.insertOne({
            _sender: airMail._sender,
            _receiver: airMail._receiver,
            _date: airMail._date,
            _subject: airMail._subject,
            _content: airMail._content
        }).catch((reason)=>{
            ResEnd(false,reason,res);
        }).then(() => {
            ResEnd(true,"Mail sent",res);
        })
    }
}

export function DELETE_AIRMAIL(id:string | string[], res:any) {
    if (typeof id === 'object') {
        for (const objId in id) {
            AIRMAIL_DB.deleteOne({"_objectId": objId});
        }
    } else {
        AIRMAIL_DB.deleteOne({"_objectId": id});
    }
    
    ResEnd(true,"Mail Deleted",res);
}

export function GET_AIRMAIL(identity:string, res:any) {
    AIRMAIL_DB.find({$or:[
        {"_sender": identity},
        {"_receiver": identity}
    ]}).toArray((error,result) => {
        if (error) throw error;
        res.send(JSON.stringify(result));
    })
}