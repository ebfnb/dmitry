const R=require('ramda')

export default R.curry(
    (arr1,arr2)=>(arr2.length===R.union(arr1,arr2).length)    
)
