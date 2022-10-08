//IMPORT STATEMENT
import http from "http";
import express from "express";
import WriteLog from "../util/streamlog";
import { ResEnd } from "../util/resEnder";
import { SITE_CONFIG } from "../util/configuration";

//CONSTANT STATEMENT
const router = express.Router();
/**
 * 气象查询服务
 */
router.post('/',(req, res) => {
    res.header("Access-Control-Allow-Origin", SITE_CONFIG.SITE_URL);
    console.log("token: "+req.body["token"])
    console.log("ip: "+req.ip)
    console.log("server: "+req.body["server"])
    console.log("Code: "+req.body["airCode"])
    const postData = JSON.stringify({
        "id": "6333003cddd74f18e28e2e6e",
        "secretkey": "444a7b8b560d4200acc3836ab03abe80",
        "scene":0,
        "token": req.body["token"],
        "ip": req.ip
    })
    const options = {
        hostname: req.body['server'],
        port:80,
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const request = http.request(options, (response) => {
        let Data:string;
        response.setEncoding("utf-8");
        response.on('data', (data) => {
            Data += data;
        }).on('end', () => {
            Data = JSON.parse(Data);
            if (Data[0] !== undefined) {
                console.log(Data[0]);
                let WData = '';
                WriteLog("Weather request from ip: "+req.ip);
                http.get(
                    "http://avt7.xiamenair.com.cn/Home/AirportMetarInfo?airport4Code="+req.body["airCode"],
                    (response)=>{
                        response.setEncoding("utf-8");
                        response.on('data',(data) => {
                            WData += data;
                        }).on("end", () => {
                            res.send(JSON.stringify(WData));
                        }).on("error", (err) => {
                            res.send(ResEnd(false,`Internal Error:\n${err.message}`,response));
                        })
                    }
                )
            } else {
                console.log(Data);
                WriteLog("Unauthorized api request from ip: "+req.ip);
                res.statusCode = 505;
                ResEnd(false,"Unauthorized API request",res);
            }
        })
    })
    request.write(postData);
    request.end();
})

export const WEATHER_API = router;