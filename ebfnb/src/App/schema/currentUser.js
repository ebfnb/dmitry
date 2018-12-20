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
    currentUser:gql`
        query currentUser {
            currentUser  {
                firstName 
                lastName 
                notes
            }
        }
    `
}
export default {mutations,queries}