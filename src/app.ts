import express from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import MongoStore from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { MONGODB_DB_NAME } from "./util/configuration";
//API
import { WEATHER_QUERY } from "./api/weather";
import { MailAPI } from "./api/airmail";
import { userAPI } from "./api/user";
//SETUP EXPRESS SERVER
const app = express();


//EXPRESS CONFIGUREATION
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongoUrl:MONGODB_URI,
        dbName:MONGODB_DB_NAME.MAIN
    })
}))
app.use(
    express.static(path.join(__dirname, "/public"), { maxAge: 31557600000 })
);

//EXPRESS API INTEGRATION
app.use('/weather', WEATHER_QUERY);
app.use('/mail', MailAPI);
app.use('/user', userAPI);

app.get('/', (req,res) => {
    res.render("home")
})

export default app;