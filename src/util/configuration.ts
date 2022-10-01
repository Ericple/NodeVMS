import { exit } from "process";

if (
    !process.env["SITE_URL"] ||
    !process.env["PORT"] ||
    !process.env["SITE_NAME"] ||
    !process.env["NODE_ENV"] ||
    !process.env["MONGODB_URI_LOCAL"] ||
    !process.env["SESSION_SECRET"] ||
    !process.env["AUTH_HOST"] ||
    !process.env["AUTH_USER"] ||
    !process.env["AUTH_PASS"] ||
    !process.env["AIRMAIL"] ||
    !process.env["ACCOUNT"] ||
    !process.env["LOG"] ||
    !process.env["SESSION"] ||
    !process.env["AIRCRAFT"] 
) {
    exit(42);
}
//Edit to your site info
export const SITE_CONFIG = {
    SITE_URL: process.env["SITE_URL"],
    PORT: process.env["PORT"],
    SITE_NAME: process.env["SITE_NAME"]
}
//Edit to your SMTP server AUTH
export const MAIL_CONFIG = {
    AUTH: {
        host: process.env["AUTH_HOST"],
        user: process.env["AUTH_USER"],
        pass: process.env["AUTH_PASS"]
    },
    OPTIONS: {
        secure: false,
        port: 587
    }
};
//DATABASE INFORMATION
export const MONGODB_DB = {
    CONNECT_STRING: process.env["MONGODB_URI_LOCAL"],
    MAIN: process.env["SITE_NAME"],
    AIRMAIL: process.env["AIRMAIL"],
    ACCOUNT: process.env["ACCOUNT"],
    LOG: process.env["LOG"],
    SESSION: process.env["SESSION"],
    AIRCRAFT: process.env["AIRCRAFT"]
};