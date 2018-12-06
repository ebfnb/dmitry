export const withErrors=(dataFields)=>(
    `{
        errors:[String]
        data:{${dataFields}}
    }`
)