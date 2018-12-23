import useQuery from './useQuery'
import currentUserSchema from '../../schema/currentUser'

const {
    queries:{currentUser},
}=currentUserSchema

const useCurrentUser=()=>{
    const {data:{currentUser}}=useQuery(currentUser)
    return currentUser
}
export default currentUser