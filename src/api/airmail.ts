//IMPORT STATEMENT
import { MongoClient } from "mongodb";
import express from 'express';
import { MONGODB_URI } from "../util/secrets";
import { MONGODB_DB_NAME } from "../util/configuration";
import DATATYPES from "../types/global";
import WriteLog from "../util/streamlog";
import { ResEnd } from "../util/resEnder";

//CONSTANT DECLARATION
const router = express.Router();
const mongoConnect = new MongoClient(MONGODB_URI);
const database = mongoConnect.db(MONGODB_DB_NAME.MAIN);
const mailDB = database.collection(MONGODB_DB_NAME.AIRMAIL);
const date = new Date();
/**
 * 空中邮箱API
 */
router.get('/', (req, res) => {
    mailDB.find({$or:[
        {"_sender": req.body["identity"]},
        {"_receiver": req.body["identity"]}
    ]}).toArray((error,result) => {
        if (error) throw error;
        res.send(JSON.stringify(result));
    })
})

router.post('/', (req, res) => {
    let mail:DATATYPES.MAIL = {
        _sender: req.body["sender"],
        _receiver: req.body["receiver"],
        _date: date.toLocaleDateString()+" "+date.toLocaleTimeString(),
        _subject: req.body["subject"],
        _content: req.body["content"]
    }
    if (typeof mail._receiver === 'object') {
        const _receiverCount = mail._receiver.length
        for (let i = 0;i<_receiverCount;i++) {
            mailDB.insertOne({
                _sender: mail._sender,
                _receiver: mail._receiver[i],
                _date: mail._date,
                _subject: mail._subject,
                _content: mail._content
            }).catch((reason) => {
                ResEnd(false,"error",res);
            })
        }
        ResEnd(true,"Mail sent",res);
    } else {
        mailDB.insertOne({
            _sender: mail._sender,
            _receiver: mail._receiver,
            _date: mail._date,
            _subject: mail._subject,
            _content: mail._content
        }).catch((reason)=>{
            ResEnd(false,reason,res);
        }).then(() => {
            ResEnd(true,"Mail sent",res);
        })
    }
})

router.delete('/', (req, res) => {
    if (typeof req.body["id"] === 'object') {
        for (const objId in req.body["id"]) {
            mailDB.deleteOne({"_objectId": objId});
        }
    } else {
        mailDB.deleteOne({"_objectId": req.body["id"]});
    }
    
    ResEnd(true,"Mail Deleted",res);
})

export const MailAPI = router;