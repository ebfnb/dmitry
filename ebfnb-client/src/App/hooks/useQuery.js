import { useQuery as useRahQuery } from 'react-apollo-hooks'
import handleServerErrors from '../../utils/handleServerErrors'

const useQuery=(...args)=>{
    const {errors,...others}=useRahQuery(...args)
    handleServerErrors(errors)
    return {errors,...others}
}
export default useQuery