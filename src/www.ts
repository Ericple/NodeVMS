import errorHandler from "errorhandler";
import app from './app';

if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

const server = app.listen(app.get("port"), () => {
    console.log("NodeVMS running at http://localhost:%d in %s MODE",app.get("port"),app.get("env"));
})