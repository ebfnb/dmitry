import useQuery from './useQuery'
import {useClient} from 'react-apollo-hooks'
import gql from 'graphql-tag'

const mutations={
    login:gql`
        mutation login($input:LoginInput){
            login(input:$input){void}
        }
    `,
    register:gql`
        mutation register($input:RegisterInput){
            register(input:$input){void}
        }
    `,
    updateProfile:gql`
        mutation updateProfile($input:UpdateProfileInput){
            updateProfile(input:$input){void}
        }
    `
}
const queries={
    currentUserProfile:gql`query currentUser {
        firstName 
        lastName 
        notes
    }`
}

const useCurrentUser=()=>{
    const client=useClient()
    const {data:currentUserProfile}=useQuery(queries.currentUserProfile)
    return currentUser
}
export default currentUser