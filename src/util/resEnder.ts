import IDATATYPES from '../types/global'
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
    res.send(JSON.stringify(result));
}