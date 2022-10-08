export namespace DataStructure {
    export type AirMail = {
        _sender : string,
        _receiver : string | string[],
        _date : string,
        _subject : string,
        _content : string
    }

    export type Account = {
        _identity : string,
        _pw : string,
        _nickName : string,
        _email : string,
        _permission : number,
        _flights : number,
        _duration : number,
        _lastLogin : string,
        _company : string,
        _wealth : number,
        _post : string,
        _active : boolean,
        _multiLogin : boolean,
        _activateCode : string
    }
}