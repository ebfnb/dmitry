import {useMutation,useQuery} from '../hooks'
import {useApolloClient} from 'react-apollo-hooks'

const currentUserProfile=gql`query currentUserProfile {
    firstName 
    lastName 
    notes
}`
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

export const useCurrentUserProfile=(options)=>useQuery(currentUserProfile,options)

const useLoginOrRegister=(name)=>(options)=>{
    const client=useApolloClient()
    const [mutation,mutationState]=useMutation(mutations[name],options)
    return [
        (options)=>mutation(options).then((res)=>{
            client.resetStore()
            return res
        }),
        mutationState
    ]
}
export const useLogin=(options)=>useLoginOrRegister('login')(options)
export const useRegister=(options)=>useLoginOrRegister('register')(options)
export const useUpdateCurrentUserProfile=(options)=>{
    const {refetch}=useCurrentUserProfile()
    const [mutation,mutationState]=useMutation(mutations.updateProfile,options)
    return [
        (options)=>mutation(options).then((res)=>{
            refetch()
            return res
        }),
        mutationState
    ]
}
