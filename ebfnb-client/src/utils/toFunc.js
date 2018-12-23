export default (val)=>(
    (typeof val==='function')?val:()=>val
)