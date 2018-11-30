const R=require('ramda')

export default R.curry(   
    (helpers,instance={})=>Object.freeze(
        Object.assign(
            Object.create(helpers),
            instance
        )   
    )
)