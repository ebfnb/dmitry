import t from 'tcomb'

export default {
    function:t.Function,
    object:t.Object,
    list:t.list,
    objDict:t.dict(t.String,t.Object),
    funcDict:t.dict(t.String,t.Function),
    string:t.String,
    any:t.Any
}