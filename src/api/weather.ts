//IMPORT STATEMENT
import http from "http";
import express from "express";
import WriteLog from "../util/streamlog";

//CONSTANT STATEMENT
const router = express.Router();
/**
 * 气象查询服务
 */
router.get('/',(req, res) => {
    let Data = '';
    WriteLog("Weather request from ip: "+req.ip);
    http.get(
        "http://avt7.xiamenair.com.cn/Home/AirportMetarInfo?airport4Code="+req.body["airport4Code"],
        (response)=>{
            response.setEncoding("utf-8");
            response.on('data',(data) => {
                Data += data;
            }).on("end", () => {
                res.send(JSON.stringify(Data));
            })
        }
    )
})

export const WEATHER_QUERY = router;