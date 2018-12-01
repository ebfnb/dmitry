import client from '../App/apolloClient'

export default (props)=>{
    try{
        return client.readQuery(props)
    }catch(e){
        return null
    }
}