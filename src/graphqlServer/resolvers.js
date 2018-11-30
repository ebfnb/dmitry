import collection from '../utils/collectionDataSource'

export default (store)=>{
    const userDataSource=collection()
    return {

        currentUser:()=>{
            console.log('Q: currentUser')
            return null
        },
        login:()=>{
            console.log('login')
        }
    }
}