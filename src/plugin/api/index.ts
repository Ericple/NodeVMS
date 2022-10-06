//THIS FILE IS NOT YET FINISHED
//DO NOT REQUIRE ANYTHING FROM HERE
import { NEW_AIRMAIL, GET_AIRMAIL, DELETE_AIRMAIL } from "../../util/dataActions/dataActions";
import { SendSiteMail } from "../../util/sitemail"
import WriteLog from "../../util/streamlog";
/**
 * THIS STATEMENT PROVIDES AIRMAIL APIs
 */
export const NODEVMS_PLUGIN_API_AIRMAIL = {
    SEND_AIRMAIL: NEW_AIRMAIL,
    GET_AIRMAIL,
    DELETE_AIRMAIL
}
/**
 * THIS STATEMENT PROVIDES SITEMAIL APIs
 */
export const NODEVMS_PLUGIN_API_SITEMAIL = {
    SendSiteMail
}
/**
 * THIS STATEMENT PROVIDES GLOBAL APIs
 */
export const NODEVMS_PLUGIN_API_GLOBAL = {
    WriteLog
}