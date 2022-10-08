//THIS FILE IS NOT YET FINISHED
//DO NOT REQUIRE ANYTHING FROM HERE
import { 
    DATA_ACTIONS, NEW_ACCOUNT, 
    GET_ACCOUNT, PATCH_ACCOUNT, 
    DELETE_ACCOUNT, NEW_AIRCRAFT, 
    GET_AIRCRAFT, PATCH_AIRCRAFT, 
    DELETE_AIRCRAFT, NEW_PIERP, 
    DELETE_PIERP, GET_PIERP } from "../../util/dataActions/dataActions";
import { SendSiteMail } from "../../util/sitemail"
import WriteLog from "../../util/streamlog";

export namespace NODEVMS_PLUGIN_API {
/**
 * THIS STATEMENT PROVIDES GLOBAL APIs
 */
 export const GLOBAL = {
    LOG: WriteLog
}

/**
 * THIS STATEMENT PROVIDES AIRMAIL APIs
 */
export const AIRMAIL = {
    SEND: DATA_ACTIONS.AIRMAIL.NEW_AIRMAIL,
    GET: DATA_ACTIONS.AIRMAIL.GET_AIRMAIL,
    DELETE: DATA_ACTIONS.AIRMAIL.DELETE_AIRMAIL
}

/**
 * THIS STATEMENT PROVIDES SITEMAIL APIs
 */
export const SITEMAIL = {
    SEND: SendSiteMail
}

/**
 * THIS STATEMENT PROVIDES ACCOUNT APIs
 */
export const ACCOUNT = {
    CREATE: NEW_ACCOUNT,
    GET: GET_ACCOUNT,
    PATCH: PATCH_ACCOUNT,
    DELETE: DELETE_ACCOUNT
}

/**
 * THIS STATEMENT PROVIDES AIRCRAFT CONTROL APIs
 */
export const AIRCRAFT = {
    CREATE: NEW_AIRCRAFT,
    GET: GET_AIRCRAFT,
    PATCH: PATCH_AIRCRAFT,
    DELETE: DELETE_AIRCRAFT
}

/**
 * THIS STATEMENT PROVIDES PIERP CONTROL APIs
 */
export const PIERP = {
    NEW: NEW_PIERP,
    DELETE: DELETE_PIERP,
    GET: GET_PIERP
}
}
