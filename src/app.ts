import express from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import MongoStore from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { MONGODB_DB } from "./util/configuration";
//EXPRESS ROUTER
import { WEATHER_PAGE } from "./router/weather";
import { APIs } from "./api";
import { HOME_PAGE } from "./router/home";
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
        dbName:MONGODB_DB.MAIN
    })
}))
app.use(
    express.static(path.join(__dirname, "/public"), { maxAge: 31557600000 })
);

//EXPRESS API INTEGRATION
app.use('/api', APIs);

//EXPRESS ROUTERS INTEGRATION
app.use('/', HOME_PAGE)
app.use('/weather', WEATHER_PAGE);

export default app;