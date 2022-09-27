export namespace DATATYPES {
    export interface USER_REG {
        _identity:string,
        _pw:string,
        _nickName:string,
        _email:string
    }

    export interface MAIL {
        _sender:string,
        _receiver: string | string[],
        _date:string,
        _subject:string,
        _content:string
    }

    export interface ResEndArgs {
        key:string,
        property:string
    }

    export interface PIERP {
        _date:string,
        _departure:string,
        _arrival:string,
        _duration:string | number,
        _fuel:number,
        _fuel_price:number,
        _pax: {
            _class_A:number | null
            _class_B:number | null
            _class_C:number | null
            _class_D:number | null
        }
        _ticket_price: {
            _class_A:number | null
            _class_B:number | null
            _class_C:number | null
            _class_D:number | null
        }
        _upload:string,
        _content:string,
    }

    export interface GOAL {
        _condition:CONDITION,
        _icon_url:string,
    }

    export interface AIRPORT {
        _icao:string,
        _iata:string,
        _name:string,
        _city:string,
        _lat:number,
        _lon:number
    }

    export interface CONDITION {
        _record_name:string,
        _condition:number | string
    }
}

export default DATATYPES;