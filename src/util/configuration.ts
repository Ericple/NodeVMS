import { exit } from "process";

if (
    !process.env["SITE_URL"] ||
    !process.env["SITE_PORT"] ||
    !process.env["SITE_NAME"] ||
    !process.env["NODE_ENV"] ||
    !process.env["MONGODB_URI_LOCAL"] ||
    !process.env["SESSION_SECRET"] ||
    !process.env["MAIL_AUTH_HOST"] ||
    !process.env["MAIL_AUTH_USER"] ||
    !process.env["MAIL_AUTH_PASS"] ||
    !process.env["DB_AIRMAIL"] ||
    !process.env["DB_ACCOUNT"] ||
    !process.env["DB_LOG"] ||
    !process.env["DB_SESSION"] ||
    !process.env["DB_AIRCRAFT"] ||
    !process.env["MAIL_OPTIONS_PORT"] ||
    !process.env["DB_MARKET"]
) {
    console.log("ERROR: .env FILE NOT SET");
    exit(42);
}
//Edit to your site info
export const SITE_CONFIG = {
    SITE_URL: process.env["SITE_URL"],
    PORT: process.env["SITE_PORT"],
    SITE_NAME: process.env["SITE_NAME"]
}
//Edit to your SMTP server AUTH
export const MAIL_CONFIG = {
    AUTH: {
        host: process.env["MAIL_AUTH_HOST"],
        user: process.env["MAIL_AUTH_USER"],
        pass: process.env["MAIL_AUTH_PASS"]
    },
    OPTIONS: {
        secure: process.env["MAIL_OPTIONS_SECURE"] ? true : false,
        port: parseInt(process.env["MAIL_OPTIONS_PORT"])
    }
};
//DATABASE INFORMATION
export const MONGODB_DB = {
    CONNECT_STRING: process.env["MONGODB_URI_LOCAL"],
    MAIN: process.env["SITE_NAME"],
    AIRMAIL: process.env["DB_AIRMAIL"],
    ACCOUNT: process.env["DB_ACCOUNT"],
    LOG: process.env["DB_LOG"],
    SESSION: process.env["DB_SESSION"],
    AIRCRAFT: process.env["DB_AIRCRAFT"],
    MARKET: process.env["DB_MARKET"]
};