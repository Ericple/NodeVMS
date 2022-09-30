//Edit to your site info
export const SITE_CONFIG = {
    SITE_URL: "localhost",
    PORT: 3000,
    SITE_NAME: "nodeVMS"
}
//Edit to your SMTP server AUTH
export const MAIL_CONFIG = {
    AUTH: {
        host: "smtp.mxhichina.com",
        user: "site@peercat.cn",
        pass: "hsf(&398gT(#*g4h-2"
    },
    OPTIONS: {
        secure: false,
        port: 587
    }
};
//DATABASE INFORMATION
export const MONGODB_DB = {
    CONNECT_STRING: "mongodb://localhost:27017/",
    MAIN:"nodeVMS",
    AIRMAIL:"airmails",
    ACCOUNT:"accounts",
    LOG:"logs",
    SESSION:"sessions",
    AIRCRAFT:"aircrafts"
};