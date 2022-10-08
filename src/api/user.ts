//IMPORT STATEMENT
import express from 'express';
import { Encryptor } from '../util/encrypt';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '../util/secrets';
import { MONGODB_DB, SITE_CONFIG } from '../util/configuration';
import { SendSiteMail } from '../util/sitemail';
import WriteLog from '../util/streamlog';
import { ResEnd } from '../util/resEnder';
import { createSession } from '../util/session';
import url from 'url';
//CONSTANT DECLARATION
const router = express.Router();
const mongoConnect = new MongoClient(MONGODB_URI);
const database = mongoConnect.db(MONGODB_DB.MAIN);
const userDB = database.collection(MONGODB_DB.ACCOUNT);
const encryptor = new Encryptor();

//MAIN
router.post('/reg', (req, res) => {
    userDB.find({$or:[
        {"_identity": req.body["identity"]}, {"_email": req.body["email"]}
    ]}).toArray((error, result) => {
        if (error) {
            WriteLog(error.message);
        } else if( result !== undefined && result.length === 0 ) {
            let activateCode = Math.random().toString().slice(-8);
            userDB.insertOne({
                _identity:req.body["identity"],
                _pw:encryptor.Encrypt(req.body["pw"]),
                _nickName:req.body["nickName"],
                _email:req.body["email"],
                _permission:0,
                _flights:0,
                _duration:0,
                _lastLogin:null,
                _company:null,
                _wealth:0,
                _post:"Free",
                _avatarUrl:null,
                _active:false,
                _multiLogin:false,
                _activateCode:activateCode,
                _deleteCode:null
            }).then(() => {
                SendSiteMail(
                    req.body["email"],
                    `${SITE_CONFIG.SITE_NAME}账号激活`,"",
                    `使用以下链接激活该邮箱注册的${SITE_CONFIG.SITE_NAME}账号:\n\n`+
                    `<a href="${SITE_CONFIG.SITE_URL}:${SITE_CONFIG.PORT}/user/verify?activateCode=${activateCode}&identity=${req.body["identity"]}">${SITE_CONFIG.SITE_URL}:${SITE_CONFIG.PORT}/user/verify?activateCode=${activateCode}&identity=${req.body["identity"]}</a>`
                )
                ResEnd(true,"success",res);
            })
        } else {
            ResEnd(false,"same username or email",res);
        }
    })
})

router.post('/login', (req, res) => {
    userDB.find({$and:[
        {'_identity': req.body["identity"]}, {'_pw': req.body["pw"]}, {'_active': true}
    ]}).toArray((error, result) => {
        if (error) {WriteLog(error.message)} else {
            if (result !== undefined && result.length === 1) {
                let session = createSession(req.body["identity"]);
                ResEnd(true,session,res);
            } else {
                ResEnd(false,"invalid login token",res);
            }
        };
    })
})

router.delete('/', (req, res) => {
    userDB.find({'_identity': req.body['identity']}).toArray((error, result) => {
        if (error) {WriteLog(error.message)}else {
            if (result !== undefined && result.length === 1 ) {
                let deleteCode = Math.random().toString().slice(-8);
                userDB.updateOne({'_identity': req.body['identity']},{_deleteCode:deleteCode})
                let email = JSON.parse(JSON.stringify(result))["_email"];
                SendSiteMail(
                    email,
                    `销毁${SITE_CONFIG.SITE_NAME}账号`,"",
                    `单击下方链接以确认销毁操作: \n若无法点击, 请复制到浏览器中访问\n`+
                    `${SITE_CONFIG.SITE_URL}:${SITE_CONFIG.PORT}/user/delete?deleteCode=${deleteCode}&identity=${req.body["identity"]}`
                )
            }
        }
    })
})

router.get('/delete', (req, res) => {
    userDB.find({$and:[
        {'_identity': req.body["identity"]},
        {'_deleteCode': req.body["deleteCode"]}
    ]}).toArray((error, result) => {
        if (error) {WriteLog(error.message)} else {
            if (result !== undefined && result.length === 1) {
                userDB.deleteOne({'_identity': req.body["identity"]}).then(() => {
                    ResEnd(true,"Account deleted",res);
                })
            }
        }
    })
})

router.get('/verify', (req, res) => {
    let context = url.parse(req.url).search;
    let activateCode:string, identity:string;
    if (context !== null) {
        activateCode = context.split('=')[1].split('&')[0];
        identity = context.split('&')[1].split('=')[1];
        userDB.find({$and:[
            {'_identity': identity},
            {'_activateCode': activateCode}
        ]}).toArray((error, result) => {
            if (error) {WriteLog(error.message)} else {
                if (result !== undefined && result.length === 1) {
                    userDB.updateOne({'_identity': identity},{$set:{
                        _active: true,
                        _activateCode: null
                    }}).then(() => {
                        ResEnd(true,"Account activated",res);
                    })
                } else {
                    ResEnd(false,`invalid activate token length:${result?.length} request_ident:${req.body["identity"]}`,res);
                }
            }
        })
    } else {
        ResEnd(false,'invalid activate token',res);
    }
})
export const userAPI = router;