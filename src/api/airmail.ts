//IMPORT STATEMENT
import express from 'express';
import { DELETE_AIRMAIL, GET_AIRMAIL, SEND_AIRMAIL } from "../util/dataActions/dataActions";

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
})

router.post('/', (req, res) => {
    SEND_AIRMAIL(
        req.body["sender"], 
        req.body["receiver"], 
        req.body["subject"], 
        req.body["content"], 
        res
    );
})

router.delete('/', (req, res) => {
    DELETE_AIRMAIL(
        req.body["id"], 
        res
    );
})

export const MailAPI = router;