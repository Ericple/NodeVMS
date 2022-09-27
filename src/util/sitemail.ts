import nodemailer from 'nodemailer';
import { MAIL_CONFIG, SITE_CONFIG } from './configuration';
import WriteLog from './streamlog';

//CONSTANT STATEMENT
const transporter = nodemailer.createTransport({
    host: MAIL_CONFIG.AUTH.host,
    port: MAIL_CONFIG.OPTIONS.port,
    secure: MAIL_CONFIG.OPTIONS.secure,
    auth: {
        user: MAIL_CONFIG.AUTH.user,
        pass: MAIL_CONFIG.AUTH.pass
    }
});

export function SendSiteMail(receiver:string, subject:string, text?:string, html?:string) {
    transporter.sendMail({
        from: `${SITE_CONFIG.SITE_NAME} <${MAIL_CONFIG.AUTH.user}>`,
        to: receiver,
        subject: subject,
        text: text,
        html: html
    },(err, info) => {
        if (err) {WriteLog(err.message)}else{WriteLog(info.response);};
    })
}