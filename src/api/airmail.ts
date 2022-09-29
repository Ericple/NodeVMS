//IMPORT STATEMENT
import { MongoClient } from "mongodb";
import express from 'express';
import { MONGODB_URI } from "../util/secrets";
import { MONGODB_DB } from "../util/configuration";
import DATATYPES from "../types/global";
import WriteLog from "../util/streamlog";
import { ResEnd } from "../util/resEnder";
import { DELETE_AIRMAIL, SEND_AIRMAIL } from "../util/dataActions/dataActions";

//CONSTANT DECLARATION
const router = express.Router();
const mongoConnect = new MongoClient(MONGODB_URI);
const database = mongoConnect.db(MONGODB_DB.MAIN);
const mailDB = database.collection(MONGODB_DB.AIRMAIL);
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
    SEND_AIRMAIL(req.body["sender"], req.body["receiver"], req.body["subject"], req.body["content"], res);
})

router.delete('/', (req, res) => {
    DELETE_AIRMAIL(req.body["id"], res);
})

export const MailAPI = router;