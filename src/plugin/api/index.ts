//THIS FILE IS NOT YET FINISHED
//DO NOT REQUIRE ANYTHING FROM HERE
import { 
    DATA_ACTIONS, NEW_PIERP, 
    DELETE_PIERP, GET_PIERP } from "../../util/dataActions";
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
    SEND: DATA_ACTIONS.AIRMAIL.NEW,
    GET: DATA_ACTIONS.AIRMAIL.GET,
    DELETE: DATA_ACTIONS.AIRMAIL.DELETE
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
    NEW: DATA_ACTIONS.ACCOUNT.NEW,
    GET: DATA_ACTIONS.ACCOUNT.GET,
    PATCH: DATA_ACTIONS.ACCOUNT.PATCH,
    DELETE: DATA_ACTIONS.ACCOUNT.DELETE
}

/**
 * THIS STATEMENT PROVIDES AIRCRAFT CONTROL APIs
 */
export const AIRCRAFT = {
    CREATE: DATA_ACTIONS.AIRCRAFT.NEW,
    GET: DATA_ACTIONS.AIRCRAFT.GET,
    PATCH: DATA_ACTIONS.AIRCRAFT.PATCH,
    DELETE: DATA_ACTIONS.AIRCRAFT.DELETE
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
