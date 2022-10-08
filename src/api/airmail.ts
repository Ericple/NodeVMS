//IMPORT STATEMENT
import express from 'express';
import WriteLog, { ActionLog } from '../util/streamlog';
import { DELETE_AIRMAIL, GET_AIRMAIL, NEW_AIRMAIL } from "../util/dataActions/dataActions";

//CONSTANT DECLARATION
const router = express.Router();

/**
 * 空中邮箱API
 */
router.get('/', (req, res) => {
    GET_AIRMAIL(
        req.body["identity"], 
        res
    );
    ActionLog("GET_AIRMAIL",req.ip);
})

router.post('/', (req, res) => {
    NEW_AIRMAIL(
        {
            _sender:req.body["sender"], 
            _receiver:req.body["receiver"], 
            _subject:req.body["subject"], 
            _content:req.body["content"], 
            _date:""
        },
        res
    );
    ActionLog("NEW_AIRMAIL",req.ip);
})

router.delete('/', (req, res) => {
    DELETE_AIRMAIL(
        req.body["id"], 
        res
    );
    ActionLog("DEL_AIRMAIL",req.ip);
})

export const MailAPI = router;