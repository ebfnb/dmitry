const R =require('ramda')
import priveledgedUserToken from './priveledgedUserToken'
import collection from '../utils/collectionDataSource' 

export default (options,authToken)=>{
    const {mockData}=options
    const users=collection({mockData})
}



let currentUser
const logout=async ()=>{
    currentUser=undefined
}
const login=async (username,password)=>{
    await logout()
    const foundUser=R.head(
        await usersModel.findUsers(
            R.propEq('username',username)
        )
    )
    if(!foundUser)throw new Error(`username ${username} not found`)
    if(foundUser.password!==password)throw new Error(`bad password for user ${username}`)
    currentUser=R.omit(['password'])(foundUser)
}
const getCurrentUser=()=>currentUser
export default 