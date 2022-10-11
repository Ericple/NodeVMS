import IDATATYPES from '../types/global'
import WriteLog from './streamlog'
let result = {
    state:true,
    message:""
}
export function ResEnd(state:boolean, message:string | any,res:any,args?:IDATATYPES.IResEndArgs[]) {
    result.state = state;
    result.message = message;
    if (args) {
        args.forEach(element => {
            Object.defineProperty(result,element.key,{
                value:element.property
            });
        });
    }
    WriteLog(message)
    res.send(JSON.stringify(result));
}